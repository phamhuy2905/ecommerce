const { ConflictError, BadRequestError, UnAuthorization, ForbidentError } = require("../responPhrase/errorResponse");
const { removeField, filterField } = require("../helper/helperField");
const User = require("../models/user.model");
const { createSecretKey, createTokenPair } = require("../helper/helperToken");
const {
    createKeyToken,
    findKeyByUserIdAndDelete,
    findKeyByUserIdAndUpdate,
    findByUserIdAndPull,
} = require("./keyToken.service");
const { generateCookie } = require("../helper/helperCookie");
const { removeInvalidFields } = require("../utils/nestedObj");
const { validateCreatedOneImage } = require("../validation/image.validation");
const { saveOneImage } = require("../utils/saveImage");

class UserService {
    static register = async (req, res, next) => {
        const body = removeField(req.body, "role", "avatar");
        const foundUser = await User.findOne({ email: body.email }).lean();
        if (foundUser) throw new ConflictError("Email đã được sử dụng");

        const user = await User.create(body);

        return {
            user: filterField(user, "fullName", "email", "_id", "role"),
        };
    };

    static login = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select({ password: 1, fullName: 1, email: 1, role: 1 });
        if (!user) throw new UnAuthorization("Email hoặc mật khẩu không hợp lệ");

        const compare = await user.comparePassword(password, user.password);
        if (!compare) throw new UnAuthorization("Email hoặc mật khẩu không hợp lệ");

        const { publicKey, privateKey } = createSecretKey();
        const { accessToken, refreshToken } = createTokenPair(user._id, publicKey, privateKey);

        const keyToken = await createKeyToken({
            userId: user._id,
            publicKey,
            refreshToken,
            privateKey,
        });
        if (!keyToken) throw new BadRequestError();
        generateCookie(res, "refreshToken", refreshToken);
        return {
            user: filterField(user, "_id", "email", "fullName", "role"),
            accessToken,
        };
    };

    static handelRefreshToken = async ({ keyToken, refreshTokenOld, user }, res, next) => {
        const foundTokenUsed = keyToken.refreshTokenUsed.includes(refreshTokenOld);
        if (foundTokenUsed) {
            await findKeyByUserIdAndDelete(keyToken.userId);
            throw new UnAuthorization("Something wrong happend, please login!");
        }

        const { accessToken, refreshToken } = createTokenPair(keyToken.userId, keyToken.publicKey, keyToken.privateKey);
        const key = await findKeyByUserIdAndUpdate({
            userId: keyToken.userId,
            refreshTokenOld,
            refreshTokenNew: refreshToken,
        });
        if (!key) throw new UnAuthorization("Something wrong happend, please login!");

        generateCookie(res, "refreshToken", refreshToken);
        return {
            user,
            accessToken,
        };
    };

    static logout = async (req, res, next) => {
        const foundKeyToken = await findByUserIdAndPull({
            userId: req.userId,
            refreshToken: req.refreshTokenOld,
        });
        if (!foundKeyToken) throw new UnAuthorization();
        res.clearCookie("refreshToken");
        return;
    };

    static registerShop = async (req, res, next) => {
        const shop = await User.findByIdAndUpdate(
            req.userId,
            {
                address: req.address,
                address2: req.address2,
                phoneNumber: req.phoneNumber,
                role: "0002",
            },
            { upsert: true, new: true }
        );
        return shop;
    };

    static updateProfile = async (req, res, next) => {
        let avatar;
        if (req.files.length) {
            const file = validateCreatedOneImage(req.files, "avatar");
            avatar = file ? saveOneImage({ width: 100, height: 100, file, path: "profile", name: "avatar" }) : null;
        }
        const body = removeInvalidFields(req.body);
        const update = avatar ? { ...body, avatar } : body;
        const user = await User.findByIdAndUpdate(req.userId, update, { new: true });
        return user;
    };

    static updatePassword = async (req, res, next) => {
        const { password } = req.body;
        const user = await User.findById(req.userId);
        const comparePassword = user.comparePassword(password, user.password);
        if (!comparePassword) throw new ForbidentError("Mật khẩu không hợp lệ!");
        user.password = password;
        user.save();
        return user;
    };
    static getProfile = async (req, res, next) => {
        return await User.findById(req.userId).lean();
    };
}

module.exports = UserService;

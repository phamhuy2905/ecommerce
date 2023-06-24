const { ConflictError, BadRequestError, UnAuthorization } = require("../responPhrase/errorResponse");
const { removeField, filterField } = require("../helper/helperField");
const User = require("../models/user.model");
const { createSecretKey, createTokenPair } = require("../helper/helperToken");
const { createKeyToken, findKeyByUserIdAndDelete, findKeyByUserIdAndUpdate } = require("./keyToken.service");
const { generateCookie } = require("../helper/helperCookie");
const KeyToken = require("../models/keyToken.model");

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
            refreshToken,
            publicKey,
            privateKey,
        });
        if (!keyToken) throw new BadRequestError();
        generateCookie(res, "refreshToken", refreshToken);
        return {
            user: filterField(user, "_id", "email", "fullName", "role"),
            accessToken,
        };
    };

    static handelRefreshToken = async ({ keyToken, refreshToken: ref }, res, next) => {
        const foundTokenUsed = keyToken.refreshTokenUsed.includes(ref);
        if (foundTokenUsed) {
            await findKeyByUserIdAndDelete(keyToken.userId);
            throw new BadRequestError("Something wrong happend, please login!");
        }

        const { accessToken, refreshToken } = createTokenPair(keyToken.userId, keyToken.publicKey, keyToken.privateKey);

        const key = await findKeyByUserIdAndUpdate({ userId: keyToken.userId, refreshToken, refreshTokenOld: ref });
        if (!key) throw new BadRequestError("Something wrong happend, please login!");

        const user = await User.findById(keyToken.userId).lean();
        generateCookie(res, "refreshToken", refreshToken);
        return {
            user,
            accessToken,
        };
    };

    static logout = async (req, res, next) => {
        const foundKeyToken = await KeyToken.findOneAndDelete({ userId: req.userId });
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
}

module.exports = UserService;

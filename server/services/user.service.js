const { ConflictError, BadRequestError, UnAuthorization } = require("../responPhrase/errorResponse");
const { removeField, filterField } = require("../helper/helperField");
const User = require("../models/user.model");
const { createSecretKey, createTokenPair } = require("../helper/helperToken");
const { createKeyToken, findKeyByUserIdAndDelete, findKeyByUserIdAndUpdate } = require("./keyToken.service");
const { generateCookie } = require("../helper/helperCookie");

class UserService {
    static register = async (req, res, next) => {
        const body = removeField(req.body, "role", "avatar");
        const foundUser = await User.findOne({ email: body.email }).lean();
        if (foundUser) throw new ConflictError("Email đã được sử dụng");

        const user = await User.create(body);

        return {
            data: filterField(user, "fullName", "email", "_id"),
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

        generateCookie(res, "refreshToken", refreshToken);
        console.log(refreshToken);
        return {
            accessToken,
        };
    };

    static logout = (res) => {
        res.clearCookie("refreshToken");
        return;
    };
}

module.exports = UserService;

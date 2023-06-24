const jwt = require("jsonwebtoken");
const { UnAuthorization, ForbidentError } = require("../responPhrase/errorResponse");
const KeyToken = require("../models/keyToken.model");
const User = require("../models/user.model");
const asyncHandel = require("./asynHandel");

const checkAuth = async (req, res, next) => {
    const token = req.headers["authorization"];
    const refreshToken = req.cookies.refreshToken;
    if (!token || !token.startsWith("Bear") || !refreshToken) {
        throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");
    }
    const accessToken = token.split(" ")[1];
    if (!accessToken) throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");

    const keyToken = await KeyToken.findOne({ refreshToken }).lean();
    return { keyToken, accessToken, refreshToken };
};

const authentication = asyncHandel(async (req, res, next) => {
    const { keyToken, accessToken, refreshToken } = await checkAuth(req, res, next);
    if (!keyToken) throw new UnAuthorization("Something wronggg, please relogin!");

    jwt.verify(accessToken, keyToken.publicKey, (err, decode) => {
        if (err && err?.name !== "TokenExpiredError") throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");
        if (err && err?.name === "TokenExpiredError") throw new UnAuthorization("TokenExpiredError");
    });

    jwt.verify(refreshToken, keyToken.privateKey, (err, decode) => {
        if (err) throw new UnAuthorization("Something wronggg, please relogin!");
        req.userId = keyToken.userId;
        next();
    });
});

const authenticationV2 = asyncHandel(async (req, res, next) => {
    const { keyToken, accessToken, refreshToken } = await checkAuth(req, res, next);
    if (!keyToken) throw new UnAuthorization("Something wronggg, please relogin!");

    jwt.verify(accessToken, keyToken.publicKey, (err, decode) => {
        if (err && err?.name !== "TokenExpiredError") throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");
    });

    jwt.verify(refreshToken, keyToken.privateKey, (err, decode) => {
        if (err) throw new UnAuthorization("Something wronggg, please relogin!");
        req.keyToken = keyToken;
        req.refreshToken = refreshToken;
        req.userId = keyToken.userId;
        next();
    });
});

const authenticationRole = (role) => {
    return asyncHandel(async (req, res, next) => {
        const foundUser = await User.findById(req.userId).lean();
        if (!role.includes(foundUser.role)) {
            throw new ForbidentError("You dont't have role access!");
        }
        req.userId = foundUser._id;
        next();
    });
};

module.exports = { authentication, authenticationV2, authenticationRole };

const jwt = require("jsonwebtoken");
const { UnAuthorization, ForbidentError, BadRequestError } = require("../responPhrase/errorResponse");
const asyncHandel = require("./asynHandel");
const { findUserById, findKeyTokenByUserId } = require("../repositories/auth.repo");

const checkAuth = (req) => {
    const token = req.headers["authorization"];
    const refreshToken = req.cookies.refreshToken;
    if (!token || !token.startsWith("Bear") || !refreshToken) {
        throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");
    }
    const accessToken = token.split(" ")[1];
    if (!accessToken) throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");

    return { accessToken, refreshToken };
};

const authentication = asyncHandel(async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) throw new UnAuthorization("!!userid");
    const user = await findUserById(userId);
    if (!user) throw new UnAuthorization("Something wronggg, please relogin!");

    const keyToken = await findKeyTokenByUserId(user._id);
    if (!keyToken) throw new UnAuthorization("Something wronggg, please relogin!");

    const { accessToken, refreshToken } = checkAuth(req);
    jwt.verify(accessToken, keyToken.publicKey, (err, decode) => {
        if (err && err?.name !== "TokenExpiredError") throw new UnAuthorization("Vui lòng đăng nhập để tiếp tục!");
    });

    jwt.verify(refreshToken, keyToken.privateKey, (err, decode) => {
        if (err) throw new UnAuthorization("Please relogin!");
        req.keyToken = keyToken;
        req.refreshTokenOld = refreshToken;
        req.userId = keyToken.userId;
        req.user = user;
        next();
    });
});

const authenticationRole = (role) => {
    return asyncHandel(async (req, res, next) => {
        if (!role.includes(req.user.role)) {
            throw new ForbidentError("You dont't have role access!");
        }
        next();
    });
};

module.exports = { authentication, authenticationRole };

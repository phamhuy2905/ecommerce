const jwt = require("jsonwebtoken");
const { UnAuthorization } = require("../responPhrase/errorResponse");
const KeyToken = require("../models/keyToken.model");
const User = require("../models/user.model");
const asyncHandel = require("./asynHandel");

const authentication = asyncHandel(async (req, res, next) => {
    const token = req.headers["authorization"];
    if (token && token.startsWith("Bear")) {
        const accessToken = token.split(" ")[1];
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken || !refreshToken) throw new UnAuthorization();

        const keyToken = await KeyToken.findOne({ refreshToken }).lean();
        if (!keyToken) throw new UnAuthorization("Please relogin!");

        jwt.verify(accessToken, keyToken.publicKey, (err, decode) => {
            if (err && err?.name !== "TokenExpiredError") throw new UnAuthorization("Token invalid, please relogin!");
        });

        jwt.verify(refreshToken, keyToken.privateKey, (err, decode) => {
            if (err) throw new UnAuthorization("Token invalid, please relogin!");
            req.keyToken = keyToken;
            req.refreshToken = refreshToken;
            req.userId = keyToken.userId;
            next();
        });
    } else {
        throw new UnAuthorization("Unauthorization, please login!");
    }
});

const authenticationRole = asyncHandel(async (req, res, next) => {
    const foundUser = await User.findById(req.userId).lean();
    if (foundUser.role !== "0001") {
        throw new BadRequestError(403, "You dont't have role access!");
    }
});

module.exports = { authentication, authenticationRole };

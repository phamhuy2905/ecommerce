const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const createTokenPair = (userId, publicKey, privateKey) => {
    const accessToken = jwt.sign({ id: userId }, publicKey, { expiresIn: process.env.EXPIRES_AC_TOKEN });
    const refreshToken = jwt.sign({ id: userId }, privateKey, { expiresIn: process.env.EXPIRES_RF_TOKEN });
    return { accessToken, refreshToken };
};

const createSecretKey = () => {
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");
    return { publicKey, privateKey };
};

module.exports = {
    createTokenPair,
    createSecretKey,
};

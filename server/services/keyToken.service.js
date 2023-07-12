const KeyToken = require("../models/keyToken.model");

const createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    const filter = { userId },
        update = { publicKey, privateKey, $addToSet: { refreshTokens: refreshToken } },
        options = { new: true, upsert: true };
    const keyToken = await KeyToken.findOneAndUpdate(filter, update, options);
    return keyToken ? keyToken : null;
};

const findKeyByUserIdAndDelete = async (userId) => {
    await KeyToken.findOneAndDelete({ userId });
};
const findByUserIdAndPull = async ({ userId, refreshToken }) => {
    return await KeyToken.findOneAndUpdate({ userId }, { $pull: { refreshTokens: refreshToken } }, { new: true });
};
const findKeyByUserIdAndUpdate = async ({ userId, refreshTokenOld, refreshTokenNew }) => {
    const filter = { userId },
        update = {
            $addToSet: { refreshTokenUsed: refreshTokenOld },
            $pull: { refreshTokens: refreshTokenOld },
        },
        options = { new: true, upsert: true };
    await KeyToken.findOneAndUpdate(filter, update, options);
    const keyToken = await KeyToken.findOneAndUpdate(filter, { $push: { refreshTokens: refreshTokenNew } }, options);
    return keyToken ? keyToken : null;
};

const findKeyTokenByRefreshToken = async ({ refreshToken }) => {
    return await KeyToken.findOne({ refreshTokens: { $in: [refreshToken] } });
};
module.exports = {
    createKeyToken,
    findKeyByUserIdAndDelete,
    findKeyByUserIdAndUpdate,
    findKeyTokenByRefreshToken,
    findByUserIdAndPull,
};

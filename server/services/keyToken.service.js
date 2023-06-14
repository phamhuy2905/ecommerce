const KeyToken = require("../models/keyToken.model");

const createKeyToken = async ({ userId, refreshToken, publicKey, privateKey }) => {
    const filter = { userId },
        update = { refreshToken, publicKey, privateKey, refreshTokenUsed: [] },
        options = { new: true, upsert: true };
    const keyToken = await KeyToken.findOneAndUpdate(filter, update, options);
    return keyToken ? keyToken : null;
};

const findKeyByUserIdAndDelete = async (id) => {
    await KeyToken.findOneAndDelete({ userId: id });
};

const findKeyByUserIdAndUpdate = async ({ userId, refreshToken, refreshTokenOld }) => {
    const filter = { userId },
        update = { refreshToken, $addToSet: { refreshTokenUsed: refreshTokenOld } },
        options = { new: true, upsert: true };
    const keyToken = await KeyToken.findOneAndUpdate(filter, update, options);
    return keyToken ? keyToken : null;
};

module.exports = {
    createKeyToken,
    findKeyByUserIdAndDelete,
    findKeyByUserIdAndUpdate,
};

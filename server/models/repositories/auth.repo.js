const KeyToken = require("../keyToken.model");
const User = require("../user.model");

const findUserById = async (id) => {
    return await User.findById(id).select("-createdAt -updatedAt -__v").lean();
};

const findKeyTokenByUserId = async (userId) => {
    return await KeyToken.findOne({ userId }).lean();
};

module.exports = {
    findUserById,
    findKeyTokenByUserId,
};

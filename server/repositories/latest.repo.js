const LatestMessage = require("../models/latest.model");

const updateLatestMessage = async ({ senderId, recevierId, message, latestTime }) => {
    const filter = [
            { senderId, recevierId },
            { senderId: recevierId, recevierId: senderId },
        ],
        update = { latestTime },
        options = { new: true };
    return await LatestMessage.findOneAndUpdate({ $or: filter }, update, options);
};

const createLatestMessage = async ({ senderId, recevierId, message, latestRead }) => {
    const filter = [
        { senderId, recevierId },
        { senderId: recevierId, recevierId: senderId },
    ];
    await LatestMessage.findOneAndDelete({ $or: filter });
    const newLatestMessage = await LatestMessage.create({ senderId, recevierId, message, latestRead });
    return await LatestMessage.findOne({ _id: newLatestMessage._id })
        .populate("senderId", "fullName avatar")
        .populate("recevierId", "fullName avatar")
        .lean();
};

const getLatestMessage = async ({ userId }) => {
    // const filter = [
    //     { senderId, recevierId },
    //     { senderId: recevierId, recevierId: senderId },
    // ];
    const filter = [{ senderId: userId }, { recevierId: userId }];
    return await LatestMessage.find({ $or: filter })
        .sort({ updatedAt: -1 })
        .populate({
            path: "senderId",
            select: "fullName avatar",
        })
        .populate({
            path: "recevierId",
            select: "fullName avatar",
        })
        .lean();
};

module.exports = {
    updateLatestMessage,
    getLatestMessage,
    createLatestMessage,
};

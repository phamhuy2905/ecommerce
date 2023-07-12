const Message = require("../models/message.model");

const createMessage = async ({ senderId, recevierId, message }) => {
    const newMessage = await Message.create({ senderId, recevierId, message });
    return await Message.findOne({ _id: newMessage._id })
        .populate("senderId", "fullName avatar")
        .populate("recevierId", "fullName avatar")
        .lean();
};

const deleteMessage = async ({ id }) => {
    return await Message.findById(id, { isDeleted: true });
};

const getMessage = async ({ senderId, recevierId }) => {
    const filter = [
        { senderId, recevierId },
        { recevierId: senderId, senderId: recevierId },
    ];
    return await Message.find({ $or: filter })
        .sort({ createdAt: 1 })
        .populate({
            path: "senderId",
            select: "fullName avatar",
        })
        .populate({
            path: "recevierId",
            select: "fullName avatar",
        });
};

module.exports = {
    createMessage,
    deleteMessage,
    getMessage,
};

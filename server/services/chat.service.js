const { createMessage, getMessage } = require("../repositories/message.repo");
const { getLatestMessage, createLatestMessage } = require("../repositories/latest.repo");
class ChatService {
    static createChat = async (req, res, next) => {
        const { recevierId, message } = req.body;
        const newMessage = await createMessage({ senderId: req.userId, recevierId, message });
        await createLatestMessage({ senderId: req.userId, recevierId, message, latestRead: Date.now() });
        return newMessage;
    };

    static getLatestMessage = async (req, res, next) => {
        const { userId } = req.params;
        return await getLatestMessage({ userId });
    };

    static getMessage = async (req, res, next) => {
        const { recevierId, senderId } = req.params;
        return await getMessage({ senderId, recevierId });
    };
}

module.exports = ChatService;

const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const ChatService = require("../services/chat.service");

class ChatController {
    static createChat = asyncHandel(async (req, res, next) => {
        new CREATED({ data: await ChatService.createChat(req) }).send(res);
    });
    static getLatestMessage = asyncHandel(async (req, res, next) => {
        new OK({ data: await ChatService.getLatestMessage(req) }).send(res);
    });
    static getMessage = asyncHandel(async (req, res, next) => {
        new OK({ data: await ChatService.getMessage(req) }).send(res);
    });
}

module.exports = ChatController;

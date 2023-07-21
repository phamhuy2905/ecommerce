const asynHandle = require("../middlewares/asynHandel");
const { CREATED } = require("../responPhrase/successResponse");
const CommentService = require("../services/comment.service");
class CommentController {
    static createComment = asynHandle(async (req, res, next) => {
        return new CREATED({ data: await CommentService.createComment(req) }).send(res);
    });
}

module.exports = CommentController;

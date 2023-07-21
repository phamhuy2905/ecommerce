const { BadRequestError } = require("../responPhrase/errorResponse");
const Comment = require("../models/comment.model");

class CommentService {
    static async createComment(req) {
        const { parent_commentId, comment_productId, content } = req.body;
        let rightValue;
        if (parent_commentId) {
            const maxCommentRight = Comment.findOne({ comment_productId, parent_commentId }, "comment_right", {
                sort: -1,
            });
            if (!maxCommentRight) throw new BadRequestError("Not found comment");
            rightValue = maxCommentRight + 1; // left = maxCommentRight
            await Comment.updateMany(
                { comment_productId, comment_right: { $gte: maxCommentRight } },
                { $inc: { comment_right: 2 } }
            );
            await Comment.updateMany(
                { comment_productId, comment_right: { $gt: maxCommentRight } },
                { $inc: { comment_left: 2 } }
            );
        } else {
            const maxCommentRight = await Comment.findOne({ comment_productId }, "comment_right", {
                sort: { comment_right: -1 },
            });
            if (maxCommentRight) {
                rightValue = maxCommentRight + 2;
            } else {
                rightValue = 2;
            }
        }

        const newComment = await Comment.create({
            comment_productId,
            commentUser: req.userId,
            content,
            parent_commentId,
            comment_left: rightValue - 1,
            comment_right: rightValue,
        });
        return newComment;
    }
}

module.exports = CommentService;

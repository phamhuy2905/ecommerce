const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment_productId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        commentUser: {
            type: mongoose.Types.ObjectId,
            required: true,
            validate: {
                validator: async function (val) {
                    const foundUser = await mongoose.models.User.findById(val);
                    return foundUser ? true : false;
                },
                message: "Vui lòng nhập commetUser hợp lệ!",
            },
        },
        parent_commentId: {
            type: mongoose.Types.ObjectId,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        comment_left: {
            type: Number,
            required: true,
        },
        comment_right: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// commentSchema.index({ productId: 1 }, { productId: 1, comment_right: 1 });
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

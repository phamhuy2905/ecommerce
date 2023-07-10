const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            required: true,
            validate: {
                validator: function (val) {
                    const foundUser = mongoose.models.User.findById(val);
                    return foundUser ? true : false;
                },
                message: "Id người gửi không hợp lệ",
            },
            ref: "User",
        },
        recevierId: {
            type: mongoose.Types.ObjectId,
            required: true,
            validate: {
                validator: function (val) {
                    const foundUser = mongoose.models.User.findById(val);
                    return foundUser ? true : false;
                },
                message: "Id người nhận không hợp lệ",
            },
            ref: "User",
        },

        message: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

messageSchema.index({ senderId: 1, recevierId: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

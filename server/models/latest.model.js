const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const latestSchema = new Schema(
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
        latestRead: {
            type: Date,
            default: Date.now(),
        },
        isReaded: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const LatestMessage = mongoose.model("LatestMessage", latestSchema);

module.exports = LatestMessage;

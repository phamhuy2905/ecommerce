const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keyTokenSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        privateKey: {
            type: String,
            required: true,
        },
        refreshTokens: {
            type: Array,
            default: [],
        },
        refreshTokenUsed: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const KeyToken = mongoose.model("KeyToken", keyTokenSchema);
module.exports = KeyToken;

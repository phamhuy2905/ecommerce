const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const variationSchema = new Schema(
    {
        variationShop: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        variationProduct: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        size: {
            type: Schema.Types.Mixed,
        },
        color: {
            type: String,
        },
        quantity: {
            type: String,
        },
        price: {
            type: String,
        },
    },
    { timestamps: true }
);

const Variation = mongoose.model("Variation", variationSchema);

module.exports = Variation;

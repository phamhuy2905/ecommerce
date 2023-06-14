const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
    {
        inventoryShop: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        inventoryProduct: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        inventoryStock: {
            type: Number,
            required: true,
            min: 0,
        },
        inventoryLocation: {
            type: String,
            default: "unknown",
        },
    },
    { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema(
    {
        discountShop: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        discountName: {
            type: String,
            required: true,
        },
        discountCode: {
            type: String,
            required: true,
            unique: true,
        },
        discountDesrciption: {
            type: String,
            required: true,
        },
        discountType: {
            enum: ["amount", "percen"],
            type: String,
            default: "amount", //percen
        },
        discountValue: {
            type: Number,
            required: true,
        },
        discountStartDate: {
            type: Date,
            required: true,
        },
        discountEndDate: {
            type: Date,
            required: true,
        },
        discountMaxUse: {
            type: Number,
            required: true,
        },
        discountCountUsed: {
            type: Number,
            default: 0,
        },
        discountUserAlreadyUsed: {
            type: Array,
            default: [],
        },
        discoutMaxEachUser: {
            type: Number,
            required: true,
        },
        discountMinOrderValue: {
            type: Number,
            required: true,
        },
        discountIsActive: {
            type: Boolean,
            default: true,
        },
        discountApply: {
            type: String,
            enum: ["all", "specific"],
            default: "all",
        },
        discountProductId: {
            type: Array,
            default: [],
        },
        isPublish: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;

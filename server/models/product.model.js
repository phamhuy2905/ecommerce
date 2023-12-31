const slugify = require("slugify");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producSchema = new Schema(
    {
        productShop: {
            type: mongoose.Types.ObjectId,
            required: true,
            validate: {
                validator: async function (val) {
                    const shop = await mongoose.models.User.findById(val);
                    return shop ? true : false;
                },
                message: "Vui lòng cung cấp shop hợp lệ",
            },
            ref: "User",
        },
        productName: {
            type: String,
            required: true,
        },
        productSlug: {
            type: String,
        },
        productType: {
            type: String,
            required: true,
        },
        productBrand: {
            type: String,
            default: "Unknow",
        },
        productThumbnail: {
            type: String,
            required: true,
        },
        productMultipleThumbnail: {
            type: [String],
            default: [],
        },
        productQuantity: {
            type: Number,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productDescription: {
            type: String,
            required: true,
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            set: (val) => Math.round(val * 10) / 10,
        },
        isPublish: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const clothingSchema = new Schema({
    productShop: {
        type: mongoose.Types.ObjectId,
        required: true,
        validate: {
            validator: async function (val) {
                const shop = await mongoose.models.User.findById(val);
                return shop ? true : false;
            },
            message: "Vui lòng cung cấp shop hợp lệ",
        },
        ref: "User",
    },
    size: {
        type: [String],
        required: true,
        default: [],
    },
    material: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
        default: [],
    },
    special: {
        type: [
            {
                k: { type: String },
                v: { type: String },
            },
        ],
    },
});

const electronicSchema = new Schema({
    productShop: {
        type: mongoose.Types.ObjectId,
        required: true,
        validate: {
            validator: async function (val) {
                const shop = await mongoose.models.User.findById(val);
                return shop ? true : false;
            },
            message: "Vui lòng cung cấp shop hợp lệ",
        },
        ref: "User",
    },
    manufacture: {
        type: String,
    },
    size: {
        type: [String],
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    special: {
        type: [
            {
                k: { type: String },
                v: { type: String },
            },
        ],
    },
});

producSchema.pre("save", function (next) {
    this.productSlug = slugify(this.productName, { lower: true, trim: true });
    next();
});

producSchema.index({ productName: "text", productSlug: "text", productType: "text" });

const Product = mongoose.model("Product", producSchema);
const Clothing = mongoose.model("Clothing", clothingSchema);
const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = {
    Product,
    Clothing,
    Electronic,
};

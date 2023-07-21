const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        shopOrders: {
            type: [
                {
                    shopId: {
                        type: mongoose.Types.ObjectId,
                        required: true,
                        ref: "User",
                    },
                    itemProducts: {
                        type: [
                            {
                                productId: {
                                    type: mongoose.Types.ObjectId,
                                    required: true,
                                    ref: "Product",
                                },
                                price: {
                                    type: Number,
                                    required: true,
                                },
                                quantity: {
                                    type: Number,
                                    required: true,
                                },
                                size: {
                                    type: String,
                                },
                                color: {
                                    type: String,
                                },
                                discountCode: {
                                    type: String,
                                },
                                discountValue: {
                                    type: Number,
                                },
                                discountType: {
                                    enum: ["amount", "percen"],
                                    type: String,
                                    default: "amount", //percen
                                },
                            },
                        ],
                    },
                    orderStatus: {
                        type: String,
                        enum: [
                            "pending",
                            "confirmed",
                            "shipped",
                            "cancel_by_user",
                            "cancel_by_shop",
                            "cancel_by_admin",
                            "deliverid",
                        ],
                        default: "pending",
                    },
                    reasonCancel: {
                        type: String,
                        default: "Unknow",
                    },
                    noteShop: {
                        type: String,
                    },
                    requestCancel: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },

        orderShipping: {
            type: {
                ward: {
                    type: String,
                    required: true,
                },
                district: {
                    type: String,
                    required: true,
                },
                province: {
                    type: String,
                    required: true,
                },
                address: {
                    type: String,
                    required: true,
                },
                address2: {
                    type: String,
                },
                phoneNumber: {
                    type: String,
                    required: true,
                },
                fullName: {
                    type: String,
                    required: true,
                },
            },
            _id: false,
        },
        orderPayment: {
            type: String,
            enum: ["Tiền mặt", "Chuyển khoản"],
            default: "Tiền mặt",
        },
        orderCheckOut: {
            type: {
                totalPrice: {
                    type: Number,
                },
                totalDiscount: {
                    type: Number,
                },
                totalBalance: {
                    type: Number,
                },
                totalShipping: {
                    type: Number,
                    default: 0,
                },
            },
            _id: false,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

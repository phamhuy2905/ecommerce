const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        shopOrders: {
            type: [
                {
                    shopId: {
                        type: mongoose.Types.ObjectId,
                        required: true,
                    },
                    itemProducts: {
                        type: [
                            {
                                productId: {
                                    type: mongoose.Types.ObjectId,
                                    required: true,
                                },
                                price: {
                                    type: Number,
                                    required: true,
                                },
                                quantity: {
                                    type: Number,
                                    required: true,
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
                },
            ],
            _id: false,
        },

        orderShipping: {
            type: {
                ward: {
                    type: String,
                },
                district: {
                    type: String,
                },
                province: {
                    type: String,
                },
                address: {
                    type: String,
                },
                phoneNumber: {
                    type: String,
                },
                nameReceiver: {
                    type: String,
                },
            },
            default: {},
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
        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "cancelled", "deliverid"],
            default: "pending",
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

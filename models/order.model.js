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
                                    required: true,
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
        },

        orderShipping: {
            type: {
                street: {
                    type: String,
                },
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
            },
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

// {
//     "userId": "648447fec643cb8a76b51e91",
//     "shopOrders":
//         [
//             {
//                 "shopId": "648447fec643cb8a76b51e91",
//                 "itemProducts":
//                     [
//                         {
//                             "productId": "64868c03286054bb7dd36af9",
//                             "price": 1000000,
//                             "quantity":  2,
//                             "discountCode":  "PMPLSPRING2023",
//                             "discountValue":  10000,
//                         },
//                         {
//                             "productId": "64875e64929a9e86eea55014",
//                             "price": 2000000,
//                             "quantity":  5,
//                             "discountCode":  "PMPLSPRING2024",
//                             "discountValue":  10000,
//                         },
//                     ],
//             },

//         ]
// }

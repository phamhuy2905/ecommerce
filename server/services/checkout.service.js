const { del } = require("../helper/redis");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const { incrDiscount } = require("../models/repositories/discont.repo");
const { incrInventory, reservationInventory } = require("../models/repositories/inventory.repo");
const { checkProductSever, incrProduct, reservationProduct } = require("../models/repositories/product.repo");
const { BadRequestError } = require("../responPhrase/errorResponse");
const ApiFeatured = require("../utils/apiFeatured");
const { inventoryLock } = require("./redis.service");

class CheckOutSerive {
    static checkOutReview = async ({ body }) => {
        const shopOrders = body.shopOrders;
        const newShopOrders = [];
        const dataTotal = {
            totalPrice: 0,
            totalDiscount: 0,
            totalBalance: 0,
            totalShipping: 0,
        };
        for (let i = 0; i < shopOrders.length; i++) {
            const { shopId, itemProducts, noteShop } = shopOrders[i];
            const checkProduct = await checkProductSever(itemProducts, shopId);
            if (!checkProduct.length) throw new BadRequestError("Order wrong!");

            const order = {
                shopId,
                itemProducts: checkProduct,
                noteShop,
            };
            newShopOrders.push(order);
        }
        const temp = newShopOrders.flatMap((val) => val.itemProducts);
        const totalPrice = temp.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        const totalBalance = temp.reduce((acc, curr) => {
            if (curr.discountType === "amount") {
                return acc + curr.price * curr.quantity - curr.discountValue;
            } else {
                const result = curr.price * curr.quantity;
                const resultPercen = result - result * (curr.discountValue / 100);
                return acc + resultPercen;
            }
        }, 0);
        dataTotal.totalPrice = totalPrice;
        dataTotal.totalBalance = totalBalance;
        dataTotal.totalDiscount = totalPrice - totalBalance;
        const data = {
            ...body,
            newShopOrders,
            dataTotal,
        };
        return data;
    };

    static createdOrder = async ({ body }) => {
        const { newShopOrders, dataTotal, shopOrders, ...data } = await CheckOutSerive.checkOutReview({ body });

        const newArrayShopOrders = newShopOrders.flatMap((item) => item.itemProducts);
        const arr = [];
        for (let i = 0; i < newArrayShopOrders.length; i++) {
            const { productId, quantity } = newArrayShopOrders[i];
            const keyLock = await inventoryLock({ productId, quantity });
            arr.push(keyLock ? true : false);
            if (keyLock) {
                await del(keyLock);
            }
        }
        if (arr.includes(false)) {
            throw new BadRequestError("Có một vài sản phẩm vừa cập nhât, vui lòng qua lại giỏ hàng!");
        }

        // orderShipping
        const addressUser = await Address.findById(body.addressId).lean();
        if (!addressUser) throw new BadRequestError("Địa chỉ không hợp lệ!");
        const { province, district, ward, address, address2, fullName, phoneNumber } = addressUser;
        const orderShipping = {
            fullName,
            phoneNumber,
            province,
            district,
            ward,
            address,
            address2,
        };

        const createdOrder = Order.create({
            shopOrders: newShopOrders,
            orderCheckOut: dataTotal,
            ...data,
            orderShipping,
        });
        return createdOrder;
    };

    static async cancelOrderbyAdmin({ shopId, reasonCancel, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
            },
            {
                $set: {
                    "shopOrders.$.reasonCancel": reasonCancel,
                    "shopOrders.$.orderStatus": "cancel_by_admin",
                },
            },
            {
                new: true,
            }
        );
        if (!order) throw new BadRequestError("Something wronggg!");
        const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        await Promise.all(
            itemShops.itemProducts.map(async (val) => {
                await incrInventory({ productId: val.productId, quantity: val.quantity });
                await incrProduct({ productId: val.productId, quantity: val.quantity });
            })
        );

        return await Order.findById(idOrder).lean();
    }

    static async cancelOrderbyUser({ shopId, reasonCancel, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
                "shopOrders.orderStatus": "pending",
            },
            {
                $set: {
                    "shopOrders.$.reasonCancel": reasonCancel,
                    "shopOrders.$.orderStatus": "cancel_by_user",
                },
            },
            {
                new: true,
            }
        );
        if (!order) throw new BadRequestError("Something wronggg!");
        const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        await Promise.all(
            itemShops.itemProducts.map(async (val) => {
                await incrInventory({ productId: val.productId, quantity: val.quantity });
                await incrProduct({ productId: val.productId, quantity: val.quantity });
            })
        );
        return await Order.findById(idOrder).lean();
    }

    static async requestCancelByUser({ shopId, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
                "shopOrders.orderStatus": "confirmed",
            },
            {
                $set: {
                    "shopOrders.$.requestCancel": true,
                },
            },
            {
                new: true,
            }
        );
        return order;
    }
    static async cancelOrderbyShop({ shopId, reasonCancel, idOrder }) {
        const order = await Order.findOneAndUpdate(
            [
                {
                    _id: idOrder,
                    "shopOrders.shopId": shopId,
                    "shopOrders.orderStatus": "pending",
                },
                {
                    _id: idOrder,
                    "shopOrders.shopId": shopId,
                    "shopOrders.orderStatus": "confirmed",
                },
            ],
            {
                $set: {
                    "shopOrders.$.reasonCancel": reasonCancel,
                    "shopOrders.$.orderStatus": "cancel_by_shop",
                },
            },
            {
                new: true,
            }
        );
        if (!order) throw new BadRequestError("Something wronggg!");
        const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        await Promise.all(
            itemShops.itemProducts.map(async (val) => {
                await incrInventory({ productId: val.productId, quantity: val.quantity });
                await incrProduct({ productId: val.productId, quantity: val.quantity });
            })
        );
        return await Order.findById(idOrder).lean();
    }
    static async acceptCancelByShop({ shopId, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
                "shopOrders.requestCancel": true,
            },

            {
                $set: {
                    "shopOrders.$.reasonCancel": "User yêu cầu",
                    "shopOrders.$.orderStatus": "cancel_by_shop",
                },
            },
            {
                new: true,
            }
        );
        if (!order) throw new BadRequestError("Something wronggg!");
        const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        await Promise.all(
            itemShops.itemProducts.map(async (val) => {
                await incrInventory({ productId: val.productId, quantity: val.quantity });
                await incrProduct({ productId: val.productId, quantity: val.quantity });
            })
        );
        return await Order.findById(idOrder).lean();
    }
    static async acceptCancelByAdmin({ shopId, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
                "shopOrders.requestCancel": true,
            },

            {
                $set: {
                    "shopOrders.$.reasonCancel": "User yêu cầu",
                    "shopOrders.$.orderStatus": "cancel_by_admin",
                },
            },
            {
                new: true,
            }
        );
        if (!order) throw new BadRequestError("Something wronggg!");
        const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        await Promise.all(
            itemShops.itemProducts.map(async (val) => {
                await incrInventory({ productId: val.productId, quantity: val.quantity });
                await incrProduct({ productId: val.productId, quantity: val.quantity });
            })
        );
        return await Order.findById(idOrder).lean();
    }

    static async acceptOrder({ shopId, idOrder }) {
        const order = await Order.findOneAndUpdate(
            {
                _id: idOrder,
                "shopOrders.shopId": shopId,
                "shopOrders.orderStatus": "pending",
            },

            {
                $set: {
                    "shopOrders.$.orderStatus": "confirmed",
                },
            },
            {
                new: true,
            }
        );
        // if (!order) throw new BadRequestError("Something wronggg!");
        // const itemShops = order.shopOrders.find((val) => val.shopId == shopId);

        // await Promise.all(
        //     itemShops.itemProducts.map(async (val) => {
        //         await reservationInventory({ productId: val.productId, quantity: val.quantity });
        //         await reservationProduct({ productId: val.productId, quantity: val.quantity });
        //     })
        // );
        // return await Order.findById(idOrder).lean();
        return order;
    }

    static getOrder = async (req, res, next) => {
        return await Order.find({ userId: req.userId })
            .populate("shopOrders.shopId", "fullName avatar")
            .populate("shopOrders.itemProducts.productId", "productName productType productThumbnail productSlug")
            .lean();
    };
    static getAllOrder = async (req, res, next) => {
        const queryStr = { page: req.query.page };
        const data = await new ApiFeatured(Order.find(), queryStr).paginate();
        const orders = await data.query
            .populate("shopOrders.shopId")
            .populate("userId", "fullName avatar phoneNumber email")
            .populate("shopOrders.itemProducts.productId");
        return { orders, page: orders.length ? data.page : { itemsPerPage: 12, totalItems: 0, totalPage: 0 } };
    };
    static getAllOrderPending = async (req, res, next) => {
        const queryStr = { page: req.query.page };
        const data = await new ApiFeatured(Order.find(), queryStr).paginate();
        const orders = await data.query
            .populate("shopOrders.shopId")
            .populate("userId", "fullName avatar phoneNumber email")
            .populate("shopOrders.itemProducts.productId")
            .where("shopOrders.orderStatus", "pending");
        return { orders, page: orders.length ? data.page : { itemsPerPage: 12, totalItems: 0, totalPage: 0 } };
    };

    static getOrderByShop = async (req) => {
        const shopId = req.userId;
        const data = await new ApiFeatured(Order.find({ "shopOrders.shopId": shopId }), queryStr).paginate();
        return data;
    };
    static getOneOrderByAdmin = async (req) => {
        const data = await Order.findById(req.params.id)
            .populate("shopOrders.shopId")
            .populate("userId", "fullName avatar phoneNumber email")
            .populate("shopOrders.itemProducts.productId")
            .lean();
        return data;
    };
}

module.exports = CheckOutSerive;

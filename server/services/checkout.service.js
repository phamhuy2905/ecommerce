const { del } = require("../helper/redis");
const Order = require("../models/order.model");
const { checkProductSever } = require("../repositories/product.repo");
const { BadRequestError } = require("../responPhrase/errorResponse");
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
            const { shopId, itemProducts } = shopOrders[i];
            const checkProduct = await checkProductSever(itemProducts, shopId);
            if (!checkProduct.length) throw new BadRequestError("Order wrong!");

            const totalPirce = checkProduct.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

            const totalBalance = checkProduct.reduce((acc, curr) => {
                if (curr.discountType === "amount") {
                    return acc + curr.price * curr.quantity - curr.discountValue;
                } else {
                    const result = curr.price * curr.quantity;
                    const resultPercen = result - result * (curr.discountValue / 100);
                    return acc + resultPercen;
                }
            }, 0);

            dataTotal.totalPrice = totalPirce;
            dataTotal.totalDiscount = totalPirce - totalBalance;
            dataTotal.totalBalance = totalBalance;

            const order = {
                shopId,
                itemProducts: checkProduct,
            };
            newShopOrders.push(order);
        }
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

        const createdOrder = Order.create({
            shopOrders: newShopOrders,
            orderCheckOut: dataTotal,
            ...data,
        });
        return createdOrder;
    };
}

module.exports = CheckOutSerive;
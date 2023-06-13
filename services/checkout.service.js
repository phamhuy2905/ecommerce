const { checkProductSever } = require("../repositories/product.repo");
const { BadRequestError } = require("../responPhrase/errorResponse");

class CheckOutSerive {
    static checkOutReview = async ({ body }) => {
        const shopOrders = body.shopOrders;
        const newShopOrders = [];
        const dataTotal = {
            totalPirce: 0,
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

            dataTotal.totalPirce = totalPirce;
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
}

module.exports = CheckOutSerive;

const { checkDiscountSever } = require("../respo/discount.repo");
const { checkProductSever } = require("../respo/product.repo");
const { BadRequestError } = require("../responPhrase/errorResponse");

class CheckOutSerive {
    static checkOutReview = async ({ userId, body }) => {
        const shopOrders = body.shopOrders;
        const obj = {
            total: 0,
        };
        for (let i = 0; i < shopOrders.length; i++) {
            const { shopId, itemProducts } = shopOrders[i];
            const checkProduct = await checkProductSever(itemProducts, shopId);
            if (!checkProduct.length) throw new BadRequestError("Order wrong!");

            const total = checkProduct.reduce((acc, curr) => acc + curr.price * curr.quantity - curr.discountValue, 0);
            obj.total += total;
        }
        console.log(obj);
        return "ok";
    };
}

module.exports = CheckOutSerive;

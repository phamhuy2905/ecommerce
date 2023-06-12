const { Product } = require("../models/product.model");
const Discount = require("../models/discout.model");

const getProductById = async (id) => await Product.findById(id).lean();

const checkProductSever = async (products = [], shopId) => {
    return await Promise.all(
        products.map(async (val) => {
            const foundProduct = await getProductById(val.productId);
            if (foundProduct) {
                if (val.discountCode) {
                    const foundDiscount = await Discount.findOne({
                        discountCode: val.discountCode,
                        discountShop: shopId,
                    });
                    if (foundDiscount) {
                        const {
                            discountCountUsed,
                            discountApply,
                            discountMaxUse,
                            discountType,
                            discountUserAlreadyUsed,
                            discountValue,
                            discoutMaxEachUser,
                            discountProductId,
                        } = foundDiscount;
                        if (discountApply === "all" || discountProductId.includes(val.productId)) {
                            if (discountCountUsed < discountMaxUse) {
                                const countUser = discountUserAlreadyUsed.map((value) => value == userId).length;
                                if (countUser < discoutMaxEachUser) {
                                    return {
                                        productId: foundProduct._id,
                                        price: foundProduct.productPrice,
                                        quantity: val.quantity,
                                        discountCode: val.discountCode,
                                        discountValue,
                                    };
                                }
                            }
                        }
                    }
                }
                return {
                    productId: foundProduct._id,
                    price: foundProduct.productPrice,
                    quantity: val.quantity,
                    discountCode: null,
                    discountValue: 0,
                };
            }
        })
    );
};

module.exports = {
    checkProductSever,
};

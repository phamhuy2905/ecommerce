const { Product } = require("../models/product.model");
const Discount = require("../models/discout.model");
const { BadRequestError } = require("../responPhrase/errorResponse");

const getProductById = async (id) => await Product.findById(id).lean();

const checkProductSever = async (products = [], shopId) => {
    return await Promise.all(
        products.map(async (val) => {
            const foundProduct = await getProductById(val.productId);
            if (val.quantity <= 0) {
                throw new BadRequestError("Mày phá hệ thống à!");
            }
            if (foundProduct.productQuantity < val.quantity) {
                throw new BadRequestError("Số lượng sản phẩm vượt mức cho phép!");
            }
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
                                        discountType,
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
                    discountType: "amount",
                };
            }
        })
    );
};

const reservationProduct = async ({ productId, quantity }) => {
    const product = await Product.findByIdAndUpdate(
        productId,
        {
            $inc: { productQuantity: -quantity },
        },
        { new: true }
    );
    console.log(product);
};

module.exports = {
    checkProductSever,
    reservationProduct,
};

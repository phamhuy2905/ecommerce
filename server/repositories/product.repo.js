const { Product, Electronic, Clothing } = require("../models/product.model");
const Discount = require("../models/discout.model");
const { BadRequestError } = require("../responPhrase/errorResponse");

const getProductDetail = async (id) => {
    const product = await Product.findById(id).lean();
    let productAttribute = null;
    switch (product.productType) {
        case "Electronic":
            productAttribute = await Electronic.findById(id).lean();
            product.productAttribute = productAttribute;
            return product;
        case "Clothing":
            productAttribute = await Clothing.findById(id).lean();
            product.productAttribute = productAttribute;
            return product;
        default:
            return product;
    }
};

const checkProductSever = async (products = [], shopId) => {
    return await Promise.all(
        products.map(async (val) => {
            const foundProduct = await getProductDetail(val.productId);
            if (val.quantity <= 0) {
                throw new BadRequestError("Mày phá hệ thống à!");
            }
            if (foundProduct.productAttribute.size?.length) {
                if (!foundProduct.productAttribute.size.includes(val.size))
                    throw new BadRequestError("Size bạn chọn vừa hết hoặc không tồn tại!");
            }
            if (foundProduct.productAttribute.color?.length) {
                if (!foundProduct.productAttribute.color.includes(val.color))
                    throw new BadRequestError("Màu bạn chọn vừa hết hoặc không tồn tại!");
            }
            if (foundProduct.productQuantity < val.quantity) {
                throw new BadRequestError("Sản phẩm đã hết hàng hoặc không hợp lệ, vui lòng kiểm tra lại!");
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
                            discountUserAlreadyUsed,
                            discountCode,
                            discountType,
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
                                        size: val.size,
                                        color: val.color,
                                        quantity: val.quantity,
                                        discountCode,
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
                    size: val.size,
                    color: val.color,
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
    return product;
};

const incrProduct = async ({ productId, quantity }) => {
    const product = await Product.findByIdAndUpdate(
        productId,
        {
            $inc: { productQuantity: quantity },
        },
        { new: true }
    );
    return product;
};

module.exports = {
    checkProductSever,
    reservationProduct,
    incrProduct,
};

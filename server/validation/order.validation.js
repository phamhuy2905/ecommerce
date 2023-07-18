const Joi = require("joi");
const { objectId } = require("./customValdation");

const checkOutSchema = Joi.object({
    shopOrders: Joi.array()
        .items(
            Joi.object({
                shopId: Joi.custom(objectId),
                itemProducts: Joi.array().items(
                    Joi.object({
                        productId: Joi.custom(objectId),
                        price: Joi.number().required(),
                        size: Joi.allow(Joi.string()),
                        color: Joi.allow(Joi.string()),
                        quantity: Joi.number().required(),
                        discountCode: Joi.string().allow(null),
                        discountValue: Joi.number().allow(null),
                        discountType: Joi.string().allow(null),
                    })
                ),
                noteShop: Joi.string().allow(null),
            })
        )
        .required(),
});

const createOrder = Joi.object({
    shopOrders: Joi.array()
        .items(
            Joi.object({
                shopId: Joi.custom(objectId),
                itemProducts: Joi.array().items(
                    Joi.object({
                        productId: Joi.custom(objectId),
                        price: Joi.number().required(),
                        size: Joi.allow(Joi.string()),
                        color: Joi.allow(Joi.string()),
                        quantity: Joi.number().required(),
                        discountCode: Joi.string().allow(null),
                        discountValue: Joi.number().allow(null),
                        discountType: Joi.string().allow(null),
                    })
                ),
                noteShop: Joi.string().allow(null),
            })
        )
        .required(),
    addressId: Joi.required().custom(objectId),
});

const deleteProductOrderSchema = Joi.object({
    shopId: Joi.custom(objectId).required(),
    reasonCancel: Joi.string().default("Unknown"),
    orderStatus: Joi.string().valid("cancel_by_user", "cancel_by_shop").default("cancel_by_user"),
});

module.exports = {
    checkOutSchema,
    deleteProductOrderSchema,
    createOrder,
};

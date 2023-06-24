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
                        size: Joi.string().required(),
                        color: Joi.string().required(),
                        quantity: Joi.number().required(),
                        discountCode: Joi.string(),
                    })
                ),
            })
        )
        .required(),
    orderShipping: Joi.object({
        ward: Joi.string(),
        district: Joi.string(),
        province: Joi.string(),
        address: Joi.string(),
        phoneNumber: Joi.number(),
        nameReceiver: Joi.string(),
    }).required(),
});

const deleteProductOrderSchema = Joi.object({
    shopId: Joi.custom(objectId).required(),
    reasonCancel: Joi.string().default("Unknown"),
    orderStatus: Joi.string().valid("cancel_by_user", "cancel_by_shop").default("cancel_by_user"),
});

module.exports = {
    checkOutSchema,
    deleteProductOrderSchema,
};

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

module.exports = {
    checkOutSchema,
};

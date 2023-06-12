const Joi = require("joi");

const createdProductSchema = Joi.object({
    productName: Joi.string().required().min(3),
    productType: Joi.string().required(),
    productThumbnail: Joi.required(),
    productMultipleThumbnail: Joi.array().items(Joi.string()).min(3).required(),
    productQuantity: Joi.number().required().min(0),
    productPrice: Joi.number().required().min(0),
    productDescription: Joi.string().required().min(30),
    productAttribute: Joi.object(),
});

module.exports = {
    createdProductSchema,
};

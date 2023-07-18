const Joi = require("joi");
const { customMessage } = require("./customValdation");

const createAddress = Joi.object({
    fullName: Joi.string().required().min(3),
    phoneNumber: Joi.number(),
    address: Joi.string(),
    address2: Joi.string().allow(""),
    province: Joi.string(),
    district: Joi.string(),
    ward: Joi.string(),
    isDefault: Joi.boolean(),
});

module.exports = {
    createAddress,
};

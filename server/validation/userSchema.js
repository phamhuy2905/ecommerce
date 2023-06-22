const Joi = require("joi");
const { customMessage } = require("./customValdation");

const registerUserChema = Joi.object({
    fullName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    address: Joi.string(),
    address2: Joi.string(),
    phoneNumber: Joi.number(),
});

const loginUserChema = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .error((error) => customMessage(error, { fieldName: "email", min: 8 })),
    password: Joi.string()
        .required()
        .min(8)
        .error((error) => customMessage(error, { fieldName: "password", min: 8 })),
});

module.exports = {
    registerUserChema,
    loginUserChema,
};

const Joi = require("joi");

const registerUserChema = Joi.object({
    fullName: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    address: Joi.string(),
    address2: Joi.string(),
    phoneNumber: Joi.number(),
});

const loginUserChema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
});

module.exports = {
    registerUserChema,
    loginUserChema,
};

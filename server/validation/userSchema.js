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

const registerShop = Joi.object({
    address: Joi.string()
        .required()
        .min(8)
        .error((error) => customMessage(error, { fieldName: "New address", min: 8 })),
    address2: Joi.string()
        .allow("")
        .error((error) => customMessage(error, { fieldName: "New address2", min: 8 })),
    phoneNumber: Joi.number()
        .required()
        .error((error) => customMessage(error, { fieldName: "New phoneNumber" })),
    fullName: Joi.string()
        .min(3)
        .error((error) => customMessage(error, { fieldName: "Full name", min: 3 })),
});
const updateProfile = Joi.object({
    fullName: Joi.string()
        .min(3)
        .error((error) => customMessage(error, { fieldName: "Full name", min: 3 })),
});
const updatePassword = Joi.object({
    password: Joi.string()
        .required()
        .min(8)
        .label("Password")
        .error((error) => customMessage(error, { fieldName: "Password", min: 8 })),
    password_confirm: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .label("Password_confirm")
        .error((error) => customMessage(error, { fieldName: "Password_confirm", min: 8 })),
});

module.exports = {
    registerUserChema,
    loginUserChema,
    registerShop,
    updateProfile,
    updatePassword,
};

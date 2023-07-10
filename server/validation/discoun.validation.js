const Joi = require("joi");
const { dateValid, objectId } = require("./customValdation");

const createDiscount = Joi.object({
    discountCode: Joi.string().required(),
    discountName: Joi.string().required(),
    discountDesrciption: Joi.string().required().min(10),
    discountType: Joi.string().valid("amount", "percen"),
    discountValue: Joi.number(),
    discountStartDate: Joi.date().custom(dateValid),
    discountEndDate: Joi.date().custom(dateValid),
    discountMaxUse: Joi.number().required(),
    discoutMaxEachUser: Joi.number().required(),
    discountMinOrderValue: Joi.number().required(),
    discountIsActive: Joi.boolean(),
    discountApply: Joi.string().valid("all", "specific"),
    discountProductId: Joi.array(),
});

const updateDiscount = Joi.object({
    discountName: Joi.string(),
    discountCode: Joi.string(),
    discountDesrciption: Joi.string().min(10),
    discountType: Joi.string().valid("amount", "percen"),
    discountValue: Joi.number(),
    discountStartDate: Joi.date().custom(dateValid),
    discountEndDate: Joi.date().custom(dateValid),
    discountMaxUse: Joi.number(),
    discoutMaxEachUser: Joi.number(),
    discountMinOrderValue: Joi.number(),
    discountIsActive: Joi.boolean(),
    discountApply: Joi.string().valid("all", "specific"),
    discountProductId: Joi.array(),
});

const updatePublishDiscount = Joi.object({
    isPublish: Joi.boolean(),
});

const getDiscount = Joi.object({
    discountShop: Joi.custom(objectId).required(),
});

module.exports = {
    createDiscount,
    updateDiscount,
    updatePublishDiscount,
    getDiscount,
};

// const test = {
//     "discountCode": "test discountCode",
//     "discountName": "test discountName",
//     "discountDesrciption": "test discount discountDesrciption ",
//     "discountType": "test discount",
//     "discountValue": 10000,
//     "discountStartDate": '7-12-2023',
//     "discountEndDate": '7-20-2023',
//     "discountMaxUse": 100,
//     "discoutMaxEachUser": 2,
//     "discountMinOrderValue": 1000,
//     "discountApply": "test all",
// }

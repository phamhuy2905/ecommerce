const Joi = require("joi");

const createdProductSchema = Joi.object({
    productName: Joi.string().required().min(3),
    productType: Joi.string().required(),
    // productThumbnail: Joi.required(),
    // productMultipleThumbnail: Joi.array().items(Joi.string()).min(3).required(),
    productQuantity: Joi.number().required().min(0),
    productPrice: Joi.number().required().min(0),
    productDescription: Joi.string().required().min(30),
    productAttribute: Joi.object(),
    productBrand: Joi.string().required(),
    productAttribute: Joi.object({
        manufacture: Joi.string(),
        size: Joi.array().items(Joi.string()).default([]),
        color: Joi.array().items(Joi.string()).default([]),
        material: Joi.string().required(),
        special: Joi.array().default([]),
    }).required(),
});
// const createdProductSchema = Joi.object({
//     userId: Joi.string(),
//     productName: Joi.string().required().min(3),
//     productType: Joi.string().required(),
//     productThumbnail: Joi.required(),
//     productMultipleThumbnail: Joi.array().items(Joi.string()).min(3).required(),
//     productQuantity: Joi.number().required().min(0),
//     productPrice: Joi.number().required().min(0),
//     productDescription: Joi.string().required().min(30),
//     productAttribute: Joi.object(),
//     productBrand: Joi.string().required(),
//     productAttribute: Joi.object({
//         manufacture: Joi.string(),
//         variations: Joi.array().items(
//             Joi.object({
//                 size: Joi.alternatives()
//                     .try(Joi.string(), Joi.number())
//                     .when(Joi.object({ quantity: Joi.exist(), price: Joi.exist() }), {
//                         then: Joi.required(),
//                     }),
//                 color: Joi.string(),
//                 quantity: Joi.number()
//                     .min(0)
//                     .when(Joi.object({ size: Joi.exist(), color: Joi.exist() }), {
//                         then: Joi.required(),
//                     }),
//                 price: Joi.number()
//                     .min(0)
//                     .when(Joi.object({ size: Joi.exist(), color: Joi.exist() }), {
//                         then: Joi.required(),
//                     }),
//             })
//         ),
//         material: Joi.string().required(),
//     }).required(),
// });

module.exports = {
    createdProductSchema,
};

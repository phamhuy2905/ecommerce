const mongoose = require("mongoose");
const Joi = require("joi");

const objectId = (value, helpers) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) return helpers.error("any.invalid");
};

const objectIdSchema = Joi.object({
    id: Joi.custom(objectId),
});

const dateValid = (value, helpers) => {
    const now = new Date();
    const dateStart = new Date(value);
    if (dateStart < now) return helpers.error("any.invalid");
};

module.exports = {
    objectIdSchema,
    dateValid,
};

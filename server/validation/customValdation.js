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

const customMessage = (errors = [], { fieldName, max, min }) => {
    errors.forEach((err) => {
        switch (err.code) {
            case "string.empty":
                err.message = `Truờng ${fieldName} không được bỏ trống!`;
                break;

            case "string.max":
                err.message = `Trường ${fieldName} tối đa ${max} kí tự!`;
                break;
            case "string.min":
                err.message = `Trường ${fieldName} tối thiểu ${min} kí tự!`;
                break;
            case "string.email":
                err.message = `Trường ${fieldName} không đúng định dạng!`;
                break;
        }
    });
    return errors;
};

module.exports = {
    objectIdSchema,
    dateValid,
    objectId,
    customMessage,
};

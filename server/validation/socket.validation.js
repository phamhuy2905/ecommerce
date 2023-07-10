const Joi = require("joi");
const { objectId } = require("./customValdation");

const createMessageSocket = Joi.object({
    senderId: Joi.custom(objectId).required(),
    recevierId: Joi.custom(objectId).required(),
    nameRecevier: Joi.allow(),
    message: Joi.string().required(),
});

module.exports = {
    createMessageSocket,
};

const { ValidationError } = require("../responPhrase/errorResponse");
const validatorSocket = (schema) => (data) => {
    const { error } = schema.validate(data);
    if (error) throw new ValidationError(error.message);
};

module.exports = validatorSocket;

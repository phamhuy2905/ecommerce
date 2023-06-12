const { ValidationError } = require("../responPhrase/errorResponse");
const validator = (schema, field = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[field]);
        if (error) throw new ValidationError(error.message);
        next();
    };
};

module.exports = validator;

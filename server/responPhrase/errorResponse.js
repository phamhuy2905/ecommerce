const reasonPhrase = require("./reasonPhrases");
const statusCode = require("./statusCode");

class AppError extends Error {
    constructor(message = reasonPhrase.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(message);
        this.success = false;
        this.status = status;
    }
}

class BadRequestError extends AppError {
    constructor(message = reasonPhrase.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(message, status);
    }
}

class UnAuthorization extends AppError {
    constructor(message = reasonPhrase.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status);
    }
}

class ForbidentError extends AppError {
    constructor(message = reasonPhrase.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(message, status);
    }
}

class ConflictError extends AppError {
    constructor(message = reasonPhrase.CONFLICT, status = statusCode.CONFLICT) {
        super(message, status);
    }
}

class ValidationError extends AppError {
    constructor(message = reasonPhrase.UNPROCESSABLE_ENTITY, status = statusCode.UNPROCESSABLE_ENTITY) {
        super(message, status);
    }
}

module.exports = {
    BadRequestError,
    ForbidentError,
    ConflictError,
    ValidationError,
    UnAuthorization,
};

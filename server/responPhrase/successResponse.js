const reasonPhrase = require("./reasonPhrases");
const statusCode = require("./statusCode");
class OK {
    constructor({ message = reasonPhrase.OK, status = statusCode.OK, data }) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
    send(res) {
        res.status(this.status).json({
            success: true,
            staus: this.status,
            message: this.message,
            data: this.data,
        });
    }
}

class CREATED extends OK {
    constructor({ message = reasonPhrase.CREATED, status = statusCode.CREATED, data }) {
        super({ message, status, data });
    }
}

module.exports = {
    CREATED,
    OK,
};

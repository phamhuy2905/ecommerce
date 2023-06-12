const mongoose = require("mongoose");
const {
    db: { name, host, port },
} = require("../config/config.mongodb");
class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(`mongodb://${host}:${port}/${name}`)
            .then(() => console.log("Connect mongo is successfully!"))
            .catch(() => console.log("Connect mongo is error"));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;

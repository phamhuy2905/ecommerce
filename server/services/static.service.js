const Category = require("../models/category.model");

class StaticService {
    static async getCategory() {
        return await Category.find().select("info").lean();
    }
}

module.exports = StaticService;

const Category = require("../models/category.model");

const findCategoryAndUpdate = async ({ name }) => {
    return await Category.findOneAndUpdate(
        { "info.name": name },
        {
            $inc: { "info.quantityProduct": 1 },
        },
        { upsert: true, new: true }
    );
};

module.exports = {
    findCategoryAndUpdate,
};

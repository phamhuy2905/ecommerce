const Category = require("../models/category.model");
const Inventory = require("../models/inventory.model");

class StaticService {
    static async getCategory() {
        return await Category.find().select("info").lean();
    }
    static async testAtomic(req, res, next) {
        const newAtomic = await Inventory.findOneAndUpdate(
            { inventoryShop: "648f42958478ffdec299780d" },
            {
                $set: {
                    inventoryProduct: "6490358f78047a5201f45821",
                    inventoryLocation: "HCM",
                    inventoryStock: 2000,
                },
            },
            { upsert: true, new: false }
        );
        if (!newAtomic) {
            console.log(123);
        } else {
            console.log(456);
        }
        return newAtomic;
    }
}

module.exports = StaticService;

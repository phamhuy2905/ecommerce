const Inventory = require("../models/inventory.model");

const createInventory = async ({ inventoryShop, inventoryProduct, inventoryStock }) => {
    const inventory = await Inventory.create({
        inventoryShop,
        inventoryProduct,
        inventoryStock,
    });
    return inventory;
};

const updateInventory = async ({ inventoryShop, inventoryProduct, inventoryStock }) => {
    const inventory = await Inventory.findOneAndUpdate(
        {
            inventoryShop,
            inventoryProduct,
        },
        { inventoryStock },
        { new: true }
    );
    return inventory;
};

module.exports = {
    createInventory,
    updateInventory,
};

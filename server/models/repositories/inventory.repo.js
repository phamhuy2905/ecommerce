const Inventory = require("../inventory.model");

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

const reservationInventory = async ({ productId, quantity }) => {
    const inventory = await Inventory.findOneAndUpdate(
        {
            inventoryProduct: productId,
            inventoryStock: { $gte: quantity },
        },
        { $inc: { inventoryStock: -quantity } },
        { new: true }
    );
    return inventory;
};

const incrInventory = async ({ productId, quantity }) => {
    const inventory = await Inventory.findOneAndUpdate(
        {
            inventoryProduct: productId,
        },
        { $inc: { inventoryStock: quantity } },
        { new: true }
    );
    return inventory;
};

module.exports = {
    createInventory,
    updateInventory,
    reservationInventory,
    incrInventory,
};

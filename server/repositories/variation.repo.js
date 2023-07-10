const Variation = require("../models/variation.model");

const createVariation = async ({ variationShop, variationProduct, varitions = [], quantity, price }) => {
    if (varitions.length !== 0) {
        return await Promise.all(
            varitions.map(async (val) => await Variation.create({ variationProduct, variationShop, ...val }))
        );
    }
    return await Variation.create({ variationProduct, variationShop, quantity, price });
};

module.exports = { createVariation };

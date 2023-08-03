const { Product } = require("../models/product.model");
const { createInventory, updateInventory } = require("../models/repositories/inventory.repo");

class ProductFactory {
    constructor({
        productShop,
        productName,
        productType,
        productQuantity,
        productThumbnail,
        productMultipleThumbnail,
        productPrice,
        productDescription,
        productAttribute,
        productBrand,
    }) {
        this.productShop = productShop;
        this.productName = productName;
        this.productType = productType;
        this.productThumbnail = productThumbnail;
        this.productMultipleThumbnail = productMultipleThumbnail;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productAttribute = productAttribute;
        this.productBrand = productBrand;
    }

    async createProduct(_id) {
        const newProduct = await Product.create({ ...this, _id });
        if (newProduct) {
            await createInventory({
                inventoryProduct: newProduct._id,
                inventoryShop: newProduct.productShop,
                inventoryStock: newProduct.productQuantity,
            });

            await findCategoryAndUpdate({ name: this.productType });
        }
        return newProduct;
    }

    async updateProduct(id) {
        const product = await Product.findByIdAndUpdate(id, this, { new: true });
        if (this.productQuantity) {
            await updateInventory({
                inventoryProduct: product._id,
                inventoryShop: product.productShop,
                inventoryStock: product.productQuantity,
            });
        }
        return product;
    }
}

module.exports = ProductFactory;

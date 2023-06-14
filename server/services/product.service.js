const { removeInvalidFields } = require("../utils/nestedObj");
const { BadRequestError } = require("../responPhrase/errorResponse");
const { Product, Clothing, Electronic } = require("../models/product.model");
const { Types } = require("mongoose");
const { createInventory, updateInventory } = require("../repositories/inventory.repo");
class ProductFactory {
    static productRegistry = {};
    static registryProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
    }

    static async createProduct({ type, payload }) {
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError("Type product wrong!!");
        return new productClass(payload).createProduct();
    }
    static async updateProduct({ type, id, payload }) {
        delete payload.productType;
        const body = removeInvalidFields(payload);
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError("Type product wrong!!");
        return new productClass(body).updateProduct(new Types.ObjectId(id));
    }

    static getProduct = async () => {
        return await Product.find().lean();
    };
}

class ProductService {
    constructor({
        productShop,
        productName,
        productType,
        productThumbnail,
        productMultipleThumbnail,
        productQuantity,
        productPrice,
        productDescription,
        productAttribute,
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
    }

    async createProduct(_id) {
        const newProduct = await Product.create({ ...this, _id });
        await createInventory({
            inventoryProduct: newProduct._id,
            inventoryShop: newProduct.productShop,
            inventoryStock: newProduct.productQuantity,
        });
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

class ClothingService extends ProductService {
    async createProduct() {
        const newClothing = await Clothing.create({ productShop: this.productShop, ...this.productAttribute });
        if (!newClothing) throw new BadRequestError("Create clothing wrong!!");
        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) {
            await Clothing.findByIdAndDelete(newClothing._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }

    async updateProduct(id) {
        await Clothing.findOneAndUpdate(id, this.productAttribute, { new: true });
        const product = await super.updateProduct(id);
        return product;
    }
}

class ElectronicService extends ProductService {
    async createProduct() {
        const newElectronic = await Electronic.create({ productShop: this.productShop, ...this.productAttribute });
        if (!newElectronic) throw new BadRequestError("Create electronic wrong!!");
        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) {
            await Electronic.findByIdAndDelete(newElectronic._id);
            throw new BadRequestError("Create product wrong!!");
        }
        return newProduct;
    }
    async updateProduct(id) {
        await Electronic.findOneAndUpdate(id, this.productAttribute, { new: true });
        const product = await super.updateProduct(id);
        return product;
    }
}

ProductFactory.registryProductType("Clothing", ClothingService);
ProductFactory.registryProductType("Electronic", ElectronicService);

module.exports = ProductFactory;

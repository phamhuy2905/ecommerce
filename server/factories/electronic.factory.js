const { Electronic, Product } = require("../models/product.model");
const ProductFactory = require("./product.factory");

class ElectronicFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productShop: this.productShop, productName: this.productName });
        if (foundProduct) {
            throw new ConflictError("Tên sản phẩm đã tồn tại!");
        }

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

    static async getProductDetail(id) {
        const productAttribute = await Electronic.findById(id).lean();
        return productAttribute;
    }
}

module.exports = ElectronicFactory;

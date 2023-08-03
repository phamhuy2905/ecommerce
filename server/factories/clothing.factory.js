const { Clothing, Product } = require("../models/product.model");
const ProductFactory = require("./product.factory");

class ClothingFactory extends ProductFactory {
    async createProduct() {
        const foundProduct = await Product.findOne({ productShop: this.productShop, productName: this.productName });
        if (foundProduct) {
            throw new ConflictError("Tên sản phẩm đã tồn tại!");
        }

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
    static async getProductDetail(id) {
        const productAttribute = await Clothing.findById(id).lean();
        return productAttribute;
    }
}

module.exports = ClothingFactory;

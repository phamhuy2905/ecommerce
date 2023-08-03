const { removeInvalidFields } = require("../utils/nestedObj");
const { BadRequestError } = require("../responPhrase/errorResponse");
const { Product } = require("../models/product.model");
const { Types } = require("mongoose");
const ApiFeatured = require("../utils/apiFeatured");
class ProductFactory {
    static productRegistry = {};
    static registryProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
    }

    static async createProduct({ type, payload, files }) {
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
    static async deleteSoftProduct(id) {
        return await Product.findByIdAndUpdate(id, { isPublish: false }, { new: true });
    }

    static getProduct = async (queryStr) => {
        const data = await new ApiFeatured(Product.find({ isPublish: true }), queryStr)
            .filter()
            .sort()
            .search()
            .paginate();
        const products = await data.query.populate({
            path: "productShop",
            select: "fullName address avatar",
            // match: { address: "Ho Chi Minh" },
        });
        return { products, page: products.length ? data.page : { itemsPerPage: 12, totalItems: 0, totalPage: 0 } };
    };
    static async getProductDetail(id) {
        const product = await Product.findById(id)
            .populate({
                path: "productShop",
                select: "fullName address",
            })
            .lean();
        if (!product) throw new BadRequestError("Không tìm thấy sản phẩm!", 404);
        const productClass = ProductFactory.productRegistry[product.productType];
        product.productAttribute = await productClass.getProductDetail(id);
        return product;
    }
}

module.exports = ProductFactory;

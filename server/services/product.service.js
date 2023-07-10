const { removeInvalidFields } = require("../utils/nestedObj");
const { BadRequestError, ConflictError } = require("../responPhrase/errorResponse");
const { Product, Clothing, Electronic } = require("../models/product.model");
const { Types } = require("mongoose");
const { createInventory, updateInventory } = require("../repositories/inventory.repo");
const { findCategoryAndUpdate } = require("../repositories/category.repo");
const ApiFeatured = require("../utils/apiFeatured");
const { validateCreatedOneImage, validateCreatedMultipleImage } = require("../validation/image.validation");
const { saveOneImage, saveImages } = require("../utils/saveImage");
class ProductFactory {
    static productRegistry = {};
    static registryProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef;
    }

    static async createProduct({ type, payload, files }) {
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError("Type product wrong!!");
        return new productClass(payload).createProduct(files);
    }
    static async updateProduct({ type, id, payload }) {
        delete payload.productType;
        const body = removeInvalidFields(payload);
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError("Type product wrong!!");
        return new productClass(body).updateProduct(new Types.ObjectId(id));
    }

    static getProduct = async (queryStr) => {
        const data = await new ApiFeatured(Product.find(), queryStr).filter().sort().search().paginate();

        const products = await data.query;
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
        switch (product.productType) {
            case "Electronic":
                const electronic = await Electronic.findById(id).select("-productShop -__v").lean();
                product.productAttribute = electronic;
                return product;
            case "Clothing":
                const clothing = await Clothing.findById(id).select("-productShop -__v").lean();
                product.productAttribute = clothing;
                return product;
            default:
                return product;
        }
    }
}

class ProductService {
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

    validateThumbnail(files) {
        const productThumbnail = validateCreatedOneImage(files, "productThumbnail");
        const productMultipleThumbnail = validateCreatedMultipleImage(files, "productMultipleThumbnail");
        return { productThumbnail, productMultipleThumbnail };
    }
    saveImage(files) {
        const { productThumbnail, productMultipleThumbnail } = this.validateThumbnail(files);
        const newThumbnail = saveOneImage({
            width: 280,
            height: 330,
            file: productThumbnail,
            name: "thumbnail",
            path: "product",
        });
        const newMultipleThumbnail = saveImages({
            width: 280,
            height: 330,
            files: productMultipleThumbnail,
            name: "product",
            path: "product",
        });
        return { productThumbnail: newThumbnail, productMultipleThumbnail: newMultipleThumbnail };
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

class ClothingService extends ProductService {
    async createProduct(files) {
        const foundProduct = await Product.findOne({ productShop: this.productShop, productName: this.productName });
        if (foundProduct) {
            throw new ConflictError("Tên sản phẩm đã tồn tại!");
        }
        const { productThumbnail, productMultipleThumbnail } = this.saveImage(files);
        this.productThumbnail = productThumbnail;
        this.productMultipleThumbnail = productMultipleThumbnail;

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
    async getProductDetail(id) {
        return await Clothing.findById(id);
    }
}

class ElectronicService extends ProductService {
    async createProduct(files) {
        const foundProduct = await Product.findOne({ productShop: this.productShop, productName: this.productName });
        if (foundProduct) {
            throw new ConflictError("Tên sản phẩm đã tồn tại!");
        }
        const { productThumbnail, productMultipleThumbnail } = this.saveImage(files);
        this.productThumbnail = productThumbnail;
        this.productMultipleThumbnail = productMultipleThumbnail;

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

    async getProductDetail(id) {
        return await Electronic.findById(id);
    }
}

ProductFactory.registryProductType("Clothing", ClothingService);
ProductFactory.registryProductType("Electronic", ElectronicService);

module.exports = ProductFactory;

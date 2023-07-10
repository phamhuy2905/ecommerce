const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const ProductFactory = require("../services/product.service");
class ProductController {
    static created = asyncHandel(async (req, res, next) => {
        const value = {
            type: req.body.productType,
            payload: { ...req.body, productShop: req.userId },
            files: req.files,
        };
        new CREATED({ data: await ProductFactory.createProduct(value) }).send(res);
    });
    static update = asyncHandel(async (req, res, next) => {
        const value = {
            type: req.body.productType,
            id: req.params.id,
            payload: req.body,
        };
        new CREATED({ data: await ProductFactory.updateProduct(value) }).send(res);
    });
    static getProduct = asyncHandel(async (req, res, next) => {
        new OK({ data: await ProductFactory.getProduct(req.query) }).send(res);
    });
    static getProductDetail = asyncHandel(async (req, res, next) => {
        new OK({ data: await ProductFactory.getProductDetail(req.params.id) }).send(res);
    });
}

module.exports = ProductController;

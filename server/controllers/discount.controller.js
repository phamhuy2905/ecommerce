const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const DiscountService = require("../services/discount.service");
class DiscountController {
    static getDiscount = asyncHandel(async (req, res, next) => {
        const data = {
            discountShop: req.params.discountShop,
        };
        new OK({ data: await DiscountService.getDiscount(data) }).send(res);
    });
    static createDiscount = asyncHandel(async (req, res, next) => {
        const data = {
            body: { ...req.body, discountShop: req.userId },
        };
        new CREATED({ data: await DiscountService.createDiscount(data) }).send(res);
    });
    static updateDiscount = asyncHandel(async (req, res, next) => {
        const data = {
            id: req.params.id,
            body: { ...req.body, discountShop: req.userId },
        };
        new OK({ data: await DiscountService.updateDiscount(data) }).send(res);
    });
    static updatePulishDiscount = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.idOrder,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
            orderStatus: req.body.orderStatus,
        };
        new OK({ data: await DiscountService.updatePulishDiscount(data) }).send(res);
    });
}

module.exports = DiscountController;

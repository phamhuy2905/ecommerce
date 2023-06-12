const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const DiscountService = require("../services/discount.service");
class DiscountController {
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
            id: req.params.id,
            discountShop: req.userId,
            isPublish: req.body.isPublish,
        };
        new OK({ data: await DiscountService.updatePulishDiscount(data) }).send(res);
    });
}

module.exports = DiscountController;

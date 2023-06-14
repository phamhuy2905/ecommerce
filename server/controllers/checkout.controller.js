const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const CheckOutSerive = require("../services/checkout.service");
class CheckOutController {
    static checkOutReview = asyncHandel(async (req, res, next) => {
        const data = {
            userId: req.userId,
            body: { ...req.body, userId: req.userId },
        };
        new OK({ data: await CheckOutSerive.checkOutReview(data) }).send(res);
    });

    static createdOrder = asyncHandel(async (req, res, next) => {
        const data = {
            userId: req.userId,
            body: { ...req.body, userId: req.userId },
        };
        new OK({ data: await CheckOutSerive.createdOrder(data) }).send(res);
    });
}

module.exports = CheckOutController;
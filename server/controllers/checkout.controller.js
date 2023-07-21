const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const CheckOutSerive = require("../services/checkout.service");
class CheckOutController {
    static checkOutReview = asyncHandel(async (req, res, next) => {
        const data = {
            body: { ...req.body, userId: req.userId },
        };
        new OK({ data: await CheckOutSerive.checkOutReview(data) }).send(res);
    });

    static createdOrder = asyncHandel(async (req, res, next) => {
        const data = {
            userId: req.userId,
            body: { ...req.body, userId: req.userId },
        };
        new CREATED({ data: await CheckOutSerive.createdOrder(data) }).send(res);
    });

    static cancelOrderbyAdmin = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.cancelOrderbyAdmin(data) }).send(res);
    });
    static cancelOrderbyUser = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.cancelOrderbyUser(data) }).send(res);
    });
    static cancelOrderbyUser = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.cancelOrderbyUser(data) }).send(res);
    });
    static cancelOrderbyShop = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.cancelOrderbyShop(data) }).send(res);
    });
    static requestCancelByUser = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
        };
        new OK({ data: await CheckOutSerive.requestCancelByUser(data) }).send(res);
    });
    static acceptCancelByShop = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.acceptCancelByShop(data) }).send(res);
    });
    static acceptCancelByAdmin = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.acceptCancelByAdmin(data) }).send(res);
    });
    static acceptOrder = asyncHandel(async (req, res, next) => {
        const data = {
            idOrder: req.params.id,
            shopId: req.body.shopId,
            reasonCancel: req.body.reasonCancel,
        };
        new OK({ data: await CheckOutSerive.acceptOrder(data) }).send(res);
    });

    static getOrder = asyncHandel(async (req, res, next) => {
        new OK({ data: await CheckOutSerive.getOrder(req) }).send(res);
    });
    static getOrderByShop = asyncHandel(async (req, res, next) => {
        new OK({ data: await CheckOutSerive.getOrderByShop(req) }).send(res);
    });
    static getAllOrder = asyncHandel(async (req, res, next) => {
        new OK({ data: await CheckOutSerive.getAllOrder(req) }).send(res);
    });
    static getAllOrderPending = asyncHandel(async (req, res, next) => {
        new OK({ data: await CheckOutSerive.getAllOrderPending(req) }).send(res);
    });
    static getOneOrderByAdmin = asyncHandel(async (req, res, next) => {
        new OK({ data: await CheckOutSerive.getOneOrderByAdmin(req) }).send(res);
    });
}

module.exports = CheckOutController;

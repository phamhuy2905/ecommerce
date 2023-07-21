const express = require("express");
const CheckOutController = require("../controllers/checkout.controller");
const { authentication, authenticationRole } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator");
const { checkOutSchema, cancelOrder, createOrder } = require("../validation/order.validation");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.use(authentication);
router.get("/", CheckOutController.getOrder);
router.get("/getOrderByShop", CheckOutController.getOrderByShop);
router.get("/getOneOrderByAdmin/:id", authenticationRole(["0001"]), CheckOutController.getOneOrderByAdmin);
router.get("/getAllOrder", authenticationRole(["0001"]), CheckOutController.getAllOrder);
router.get("/getAllOrderPending", authenticationRole(["0001"]), CheckOutController.getAllOrderPending);
router.post("/", authenticationRole(["0002", "0003"]), validator(checkOutSchema), CheckOutController.checkOutReview);
router.post("/created", authenticationRole(["0002", "0003"]), validator(createOrder), CheckOutController.createdOrder);
router.patch(
    "/cancelOrderbyAdmin/:id",
    authenticationRole(["0001"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.cancelOrderbyAdmin
);
router.patch(
    "/cancelOrderbyUser/:id",
    authenticationRole(["0003", "0002"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.cancelOrderbyUser
);
router.patch(
    "/cancelOrderbyShop/:id",
    authenticationRole(["0002"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.cancelOrderbyShop
);
router.patch(
    "/requestCancelByUser/:id",
    authenticationRole(["0003", "0002"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.requestCancelByUser
);
router.patch(
    "/acceptCancelByShop/:id",
    authenticationRole(["0002"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.acceptCancelByShop
);
router.patch(
    "/acceptCancelByAdmin/:id",
    authenticationRole(["0001"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.acceptCancelByAdmin
);
router.patch(
    "/acceptOrder/:id",
    authenticationRole(["0001", "0002"]),
    validator(objectIdSchema, "params"),
    validator(cancelOrder),
    CheckOutController.acceptOrder
);

module.exports = router;

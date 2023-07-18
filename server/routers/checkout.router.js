const express = require("express");
const CheckOutController = require("../controllers/checkout.controller");
const { authentication, authenticationRole } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator");
const { checkOutSchema, deleteProductOrderSchema, createOrder } = require("../validation/order.validation");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.use(authentication);
// router.use(authentication, authenticationRole(["0003"]));
router.get("/", CheckOutController.getOrder);
router.get("/getAllOrder", CheckOutController.getAllOrder);
router.post("/", validator(checkOutSchema), CheckOutController.checkOutReview);
router.post("/created", validator(createOrder), CheckOutController.createdOrder);
router.patch(
    "/delete/:id",
    validator(objectIdSchema, "params"),
    validator(deleteProductOrderSchema),
    CheckOutController.deleteProductOrderSchema
);

module.exports = router;

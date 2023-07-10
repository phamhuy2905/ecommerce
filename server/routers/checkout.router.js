const express = require("express");
const CheckOutController = require("../controllers/checkout.controller");
const { authentication, authenticationRole } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator");
const { checkOutSchema, deleteProductOrderSchema } = require("../validation/order.validation");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.use(authentication);
// router.use(authentication, authenticationRole(["0003"]));
router.post("/", validator(checkOutSchema), CheckOutController.checkOutReview);
router.post("/created", validator(checkOutSchema), CheckOutController.createdOrder);
router.patch(
    "/delete/:id",
    validator(objectIdSchema, "params"),
    validator(deleteProductOrderSchema),
    CheckOutController.deleteProductOrderSchema
);

module.exports = router;

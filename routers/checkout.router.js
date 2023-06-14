const express = require("express");
const CheckOutController = require("../controllers/checkout.controller");
const { authentication } = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator");
const { checkOutSchema } = require("../validation/order.validation");
const router = express.Router();

router.post("/", authentication, validator(checkOutSchema), CheckOutController.checkOutReview);
router.post("/created", authentication, validator(checkOutSchema), CheckOutController.createdOrder);

module.exports = router;

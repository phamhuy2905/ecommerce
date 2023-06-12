const express = require("express");
const CheckOutController = require("../controllers/checkout.controller");
const { authentication } = require("../middlewares/authMiddleware");
const { createdProductSchema } = require("../validation/productSchema");
const validator = require("../middlewares/validator");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.post("/", authentication, CheckOutController.checkOutReview);

module.exports = router;

const express = require("express");
const DiscountController = require("../controllers/discount.controller");
const { authentication } = require("../middlewares/authMiddleware");
const { createDiscount, updateDiscount, updatePublishDiscount } = require("../validation/discoun.validation");
const validator = require("../middlewares/validator");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.post("/", authentication, validator(createDiscount), DiscountController.createDiscount);
router.patch(
    "/:id",
    authentication,
    validator(objectIdSchema, "params"),
    validator(updateDiscount),
    DiscountController.updateDiscount
);
router.patch(
    "/updatePublish/:id",
    authentication,
    validator(objectIdSchema, "params"),
    validator(updatePublishDiscount, "body"),
    DiscountController.updatePulishDiscount
);

module.exports = router;

const express = require("express");
const ProducController = require("../controllers/product.controller");
const { authentication } = require("../middlewares/authMiddleware");
const { createdProductSchema } = require("../validation/productSchema");
const validator = require("../middlewares/validator");
const { objectIdSchema } = require("../validation/customValdation");
const router = express.Router();

router.get("/", ProducController.getProduct);
router.post("/", authentication, validator(createdProductSchema), ProducController.created);
router.patch("/:id", authentication, validator(objectIdSchema, "params"), ProducController.update);

module.exports = router;

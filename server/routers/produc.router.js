const express = require("express");
const ProducController = require("../controllers/product.controller");
const { authentication, authenticationRole } = require("../middlewares/authMiddleware");
const { createdProductSchema } = require("../validation/productSchema");
const validator = require("../middlewares/validator");
const { objectIdSchema } = require("../validation/customValdation");
const upload = require("../middlewares/multer.middleware");
const parseJsonMiddleware = require("../middlewares/parseJsonMiddleware");
const router = express.Router();

router.get("/", ProducController.getProduct);
router.get("/:id", validator(objectIdSchema, "params"), ProducController.getProductDetail);

router.use(authentication);
// router.use(authentication, authenticationRole(["0001", "0002"]));
router.post("/", upload, parseJsonMiddleware, validator(createdProductSchema), ProducController.created);
router.patch("/:id", validator(objectIdSchema, "params"), ProducController.update);

module.exports = router;

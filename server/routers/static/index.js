const express = require("express");
const StaticController = require("../../controllers/static.controller");
const router = express.Router();

router.get("/category", StaticController.getCategory);
router.get("/testAtomic", StaticController.testAtomic);

module.exports = router;

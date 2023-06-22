const express = require("express");
const StaticController = require("../controllers/static.controller");
const router = express.Router();

router.get("/category", StaticController.getCategory);

module.exports = router;

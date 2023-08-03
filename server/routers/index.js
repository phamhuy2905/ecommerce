const express = require("express");
const router = express.Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/product", require("./product"));
router.use("/api/v1/address", require("./address"));
router.use("/api/v1/discount", require("./discount"));
router.use("/api/v1/checkout", require("./checkout"));
router.use("/api/v1/chat", require("./chat"));
router.use("/api/v1/comment", require("./comment"));
router.use("/api/v1/static", require("./static"));

module.exports = router;

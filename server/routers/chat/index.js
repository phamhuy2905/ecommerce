const express = require("express");
const ChatController = require("../../controllers/chat.controller");
const { authentication } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.use(authentication);
router.post("/", ChatController.createChat);
router.get("/latest/:userId", ChatController.getLatestMessage);
router.get("/:senderId/:recevierId", ChatController.getMessage);

module.exports = router;

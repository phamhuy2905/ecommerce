const express = require("express");
const CommentController = require("../controllers/comment.controller");
const router = express.Router();
const { authentication, authenticationRole } = require("../middlewares/authMiddleware");

router.post("/", authentication, CommentController.createComment);

module.exports = router;

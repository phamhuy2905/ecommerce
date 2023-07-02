const express = require("express");
const validator = require("../middlewares/validator");
const { registerUserChema, loginUserChema, registerShop } = require("../validation/userSchema");
const UserController = require("../controllers/user.controller");
const { authentication } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", validator(registerUserChema), UserController.register);
router.post("/login", validator(loginUserChema), UserController.login);
router.post("/logout", authentication, UserController.logout);
router.post("/registerShop", authentication, validator(registerShop), UserController.registerShop);
router.post("/refreshToken", authentication, UserController.handelRefreshToken);

module.exports = router;

const express = require("express");
const validator = require("../middlewares/validator");
const { registerUserChema, loginUserChema, registerShop } = require("../validation/userSchema");
const UserController = require("../controllers/user.controller");
const { authentication, authenticationV2 } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", validator(registerUserChema), UserController.register);
router.post("/login", validator(loginUserChema), UserController.login);
router.post("/logout", authentication, UserController.logout);
router.post("/registerShop", authentication, validator(registerShop), UserController.registerShop);
router.post("/refreshToken", authenticationV2, UserController.handelRefreshToken);

module.exports = router;

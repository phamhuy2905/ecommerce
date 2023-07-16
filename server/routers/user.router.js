const express = require("express");
const validator = require("../middlewares/validator");
const {
    registerUserChema,
    loginUserChema,
    registerShop,
    updateProfile,
    updatePassword,
} = require("../validation/userSchema");
const UserController = require("../controllers/user.controller");
const { authentication, authenticationV2 } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer.middleware");
const parseJsonMiddleware = require("../middlewares/parseJsonMiddleware");
const router = express.Router();

router.post("/refreshToken", authenticationV2, UserController.handelRefreshToken);
router.post("/register", validator(registerUserChema), UserController.register);
router.post("/login", validator(loginUserChema), UserController.login);
router.use(authentication);
router.get("/profile", UserController.getProfile);
router.post("/logout", UserController.logout);
router.post("/registerShop", validator(registerShop), UserController.registerShop);
router.post("/updateProfile", upload, parseJsonMiddleware, validator(updateProfile), UserController.updateProfile);
router.post("/updatePassword", validator(updatePassword), UserController.updatePassword);

module.exports = router;

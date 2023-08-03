const express = require("express");
const router = express.Router();

const AccessController = require("../../controllers/access.controller");
const { authentication, authenticationV2, authenticationRole } = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/multer.middleware");
const parseJsonMiddleware = require("../../middlewares/parseJsonMiddleware");
const validator = require("../../middlewares/validator");
const {
    registerUserChema,
    loginUserChema,
    registerShop,
    updateProfile,
    updatePassword,
} = require("../../validation/userSchema");

router.post("/refreshToken", authenticationV2, AccessController.handelRefreshToken);
router.post("/register", validator(registerUserChema), AccessController.register);
router.post("/login", validator(loginUserChema), AccessController.login);

router.use(authentication);
router.get("/profile", AccessController.getProfile);
router.post("/logout", AccessController.logout);
router.post(
    "/registerShop",
    authenticationRole(["0003"]),
    upload,
    parseJsonMiddleware,
    validator(registerShop),
    AccessController.registerShop
);
router.post("/updateProfile", upload, parseJsonMiddleware, validator(updateProfile), AccessController.updateProfile);
router.post("/updatePassword", validator(updatePassword), AccessController.updatePassword);

module.exports = router;

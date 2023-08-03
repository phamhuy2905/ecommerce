const express = require("express");
const validator = require("../../middlewares/validator");
const AddressController = require("../../controllers/address.controller");
const { authentication } = require("../../middlewares/authMiddleware");
const { createAddress } = require("../../validation/address.validation");
const router = express.Router();

router.use(authentication);
router.post("/", validator(createAddress), AddressController.addAddress);
router.patch("/:id", AddressController.updateAddress);
router.get("/", AddressController.getAddress);
router.get("/default", AddressController.getAddressDefault);

module.exports = router;

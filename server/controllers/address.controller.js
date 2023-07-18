const { CREATED, OK } = require("../responPhrase/successResponse");
const asyncHandel = require("../middlewares/asynHandel");
const AddressService = require("../services/address.service");
class AddressController {
    static getAddress = asyncHandel(async (req, res, next) => {
        return new OK({ data: await AddressService.getAddress(req) }).send(res);
    });
    static getAddressDefault = asyncHandel(async (req, res, next) => {
        return new OK({ data: await AddressService.getAddressDefault(req) }).send(res);
    });
    static addAddress = asyncHandel(async (req, res, next) => {
        return new CREATED({ data: await AddressService.addAddress(req) }).send(res);
    });
    static updateAddress = asyncHandel(async (req, res, next) => {
        return new OK({ data: await AddressService.updateAddress(req) }).send(res);
    });
}
module.exports = AddressController;

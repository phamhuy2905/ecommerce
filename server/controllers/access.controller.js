const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const AcccessService = require("../services/access.service");
class AccessController {
    static register = asyncHandel(async (req, res, next) => {
        new CREATED({ message: "Đăng kí thành công", data: await AcccessService.register(req, res, next) }).send(res);
    });
    static login = asyncHandel(async (req, res, next) => {
        new OK({ message: "Đăng nhập thành công", data: await AcccessService.login(req, res, next) }).send(res);
    });
    static logout = asyncHandel(async (req, res, next) => {
        new OK({ message: "Đăng xuất thành công", data: await AcccessService.logout(req, res, next) }).send(res);
    });
    static registerShop = asyncHandel(async (req, res, next) => {
        new OK({
            message: "Đăng kí làm người bán thành công",
            data: await AcccessService.registerShop(req, res, next),
        }).send(res);
    });
    static updateProfile = asyncHandel(async (req, res, next) => {
        new OK({ data: await AcccessService.updateProfile(req, res, next) }).send(res);
    });
    static updatePassword = asyncHandel(async (req, res, next) => {
        new OK({ data: await AcccessService.updatePassword(req, res, next) }).send(res);
    });

    static handelRefreshToken = asyncHandel(async (req, res, next) => {
        new OK({ data: await AcccessService.handelRefreshToken(req, res, next) }).send(res);
    });
    static getProfile = asyncHandel(async (req, res, next) => {
        new OK({ data: await AcccessService.getProfile(req, res, next) }).send(res);
    });
}

module.exports = AccessController;

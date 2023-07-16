const asyncHandel = require("../middlewares/asynHandel");
const { CREATED, OK } = require("../responPhrase/successResponse");
const UserService = require("../services/user.service");
class UserController {
    static register = asyncHandel(async (req, res, next) => {
        new CREATED({ message: "Đăng kí thành công", data: await UserService.register(req, res, next) }).send(res);
    });
    static login = asyncHandel(async (req, res, next) => {
        new OK({ message: "Đăng nhập thành công", data: await UserService.login(req, res, next) }).send(res);
    });
    static logout = asyncHandel(async (req, res, next) => {
        new OK({ message: "Đăng xuất thành công", data: await UserService.logout(req, res, next) }).send(res);
    });
    static registerShop = asyncHandel(async (req, res, next) => {
        new OK({
            message: "Đăng kí làm người bán thành công",
            data: await UserService.registerShop(req, res, next),
        }).send(res);
    });
    static updateProfile = asyncHandel(async (req, res, next) => {
        new OK({ data: await UserService.updateProfile(req, res, next) }).send(res);
    });
    static updatePassword = asyncHandel(async (req, res, next) => {
        new OK({ data: await UserService.updatePassword(req, res, next) }).send(res);
    });

    static handelRefreshToken = asyncHandel(async (req, res, next) => {
        new OK({ data: await UserService.handelRefreshToken(req, res, next) }).send(res);
    });
    static getProfile = asyncHandel(async (req, res, next) => {
        new OK({ data: await UserService.getProfile(req, res, next) }).send(res);
    });
}

module.exports = UserController;

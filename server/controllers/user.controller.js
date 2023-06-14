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

    static handelRefreshToken = asyncHandel(async (req, res, next) => {
        new OK({ data: await UserService.handelRefreshToken(req, res, next) }).send(res);
    });
}

module.exports = UserController;
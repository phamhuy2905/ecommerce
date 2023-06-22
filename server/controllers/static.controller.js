const asyncHandel = require("../middlewares/asynHandel");
const { OK } = require("../responPhrase/successResponse");
const StaticService = require("../services/static.service");
class StaticController {
    static getCategory = asyncHandel(async (req, res, next) => {
        new OK({ data: await StaticService.getCategory(req, res, next) }).send(res);
    });
}

module.exports = StaticController;

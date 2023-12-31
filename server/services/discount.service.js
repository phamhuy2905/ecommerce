const { removeField } = require("../helper/helperField");
const Discount = require("../models/discout.model");
const { BadRequestError, ConflictError } = require("../responPhrase/errorResponse");

class DiscountService {
    static async getDiscount({ discountShop }) {
        return await Discount.find({ discountShop }).lean();
    }
    static async createDiscount({ body }) {
        const { discountStartDate, discountEndDate } = body;
        if (new Date(discountStartDate) > new Date(discountEndDate))
            throw new BadRequestError("Ngày sử dụng discount không hợp lệ!");
        const data = removeField(body, "discountCountUsed", "discountUserAlreadyUsed", "discountIsActive");
        const isExitsDiscount = await Discount.findOne({ discountCode: data.discountCode }).lean();
        if (isExitsDiscount) throw new ConflictError("Dicount code đã tồn tại!");
        const newDiscount = await Discount.create(data);
        return newDiscount;
    }

    static async updateDiscount({ id, body }) {
        const data = removeField(body, "discountShop", "discountCountUsed", "discountUserAlreadyUsed", "discountStart");

        const discount = await Discount.findOneAndUpdate(
            {
                _id: id,
                discountShop: body.discountShop,
            },
            data,
            { new: true }
        );
        return discount;
    }

    static async updatePulishDiscount({ id, discountShop, isPublish }) {
        const discount = await Discount.findOneAndUpdate(
            {
                _id: id,
                discountShop,
            },
            { isPublish },
            { new: true }
        );
        return discount;
    }
}

module.exports = DiscountService;

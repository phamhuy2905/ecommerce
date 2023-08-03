const Discount = require("../discout.model");

const incrDiscount = async ({ discountCode, userId }) => {
    return await Discount.findOneAndUpdate(
        { discountCode },
        {
            $inc: { discountCountUsed: -1 },
            $pull: { discountUserAlreadyUsed: userId },
        }
    );
};

module.exports = {
    incrDiscount,
};

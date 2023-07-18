const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    addressUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        validate: {
            validator: async function (val) {
                const foundUser = await mongoose.models.User.findById(val);
                return foundUser ? true : false;
            },
            message: "Id người gửi không hợp lệ",
        },
        ref: "User",
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "VietNam",
    },
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    isPublish: {
        type: Boolean,
        default: true,
    },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;

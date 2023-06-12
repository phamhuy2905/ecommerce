const bcrypto = require("bcryptjs");
const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            min: [3, "Tên tối thiểu 3 kí tự"],
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail, "Email không hợp lệ!"],
        },
        password: {
            type: String,
            required: true,
            min: [8, "Password tối thiểu 8 kí tự"],
            select: false,
        },
        phoneNumber: {
            type: Number,
        },
        avatar: {
            type: String,
        },
        address: {
            type: String,
        },
        address2: {
            type: String,
        },
        role: {
            type: String,
            enum: ["0001", "0002", "0003"],
            default: "0003",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const salt = bcrypto.genSaltSync(10);
    const hash = bcrypto.hashSync(this.password, salt);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async (password, passwordHash) => {
    return await bcrypto.compare(password, passwordHash);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

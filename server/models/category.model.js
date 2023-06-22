const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryChema = new Schema(
    {
        info: {
            type: [
                {
                    name: {
                        type: String,
                    },
                    quantityProduct: {
                        type: Number,
                    },
                },
            ],
            _id: false,
        },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const Category = mongoose.model("Category", categoryChema);
module.exports = Category;

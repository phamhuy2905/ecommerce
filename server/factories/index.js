const fs = require("fs");
const ProductService = require("../services/product.service");

const filesFactory = fs.readdirSync("./factories");

const capitazileFirstLetter = (letter = "") => {
    return letter[0].toUpperCase() + letter.slice(1);
};

filesFactory.forEach((fileName) => {
    if (fileName.includes("factory") && !fileName.includes("product")) {
        const type = capitazileFirstLetter(fileName.split(".")[0]);
        const classRef = type.toLowerCase();
        ProductService.registryProductType(type, require(`./${classRef}.factory`));
    }
});

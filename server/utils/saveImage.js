const sharp = require("sharp");

const saveOneImage = async ({ width, height, file, name, path }) => {
    const originalExtensionName = `assets/${path}/${name}${Date.now()}.png`;
    sharp(file.buffer)
        .resize(width, height)
        .png()
        .toFile(originalExtensionName, () => {});
    return __dirPath + originalExtensionName;
};

const saveImages = async ({ width, height, name, files = [], path }) => {
    const data = [];
    files.forEach((val, index) => {
        const originalExtensionName = `assets/${path}/${name}${index + 1}${
            Date.now() + index + Math.round(Math.random() * index + 1)
        }.png`;
        sharp(val.buffer)
            .resize(width, height)
            .png()
            .toFile(originalExtensionName, () => {});
        data.push(__dirPath + originalExtensionName);
    });
    return data;
};

module.exports = {
    saveOneImage,
    saveImages,
};

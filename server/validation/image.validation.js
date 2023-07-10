const { ValidationError } = require("../responPhrase/errorResponse");
const validateCreatedMultipleImage = (files = [], name, min = 3, max = 20) => {
    const data = files.filter((val) => {
        if (val.fieldname === name && !val.mimetype.startsWith("image"))
            throw new ValidationError(`Trường ${name} chỉ dạng png|jpg|jpge...`);
        return val.fieldname === name;
    });
    if (data.length < min || data.length > max)
        throw new ValidationError(`Field ${name} nên bé hơn ${max} và lớn hơn hoặc bằng ${min}!`);

    return data;
};

const validateCreatedOneImage = (files = [], name) => {
    const file = files.filter((val) => val.fieldname === name);
    if (file.length !== 1) throw new ValidationError(`Trường ${name} nên 1 file!`);
    if (!file[0].mimetype.startsWith("image")) {
        throw new ValidationError(`Trường ${name} chỉ dạng png|jpg|jpge...`);
    }
    return file[0];
};

const validateUpdatedOneImage = (files = [], name) => {
    const file = files.filter((val) => val.fieldname === name);
    if (file.length > 1) throw new ValidationError(`Field ${name} required just one!`);
    if (file.length === 1 && !file[0].mimetype.startsWith("image")) {
        throw new ValidationError("Please provider file type png|jpg|jpge...");
    }
    return file[0];
};

const validateUpdateMultipleImage = (newFiles = [], fileOld = [], deleteFile = [], nameFile, min = 3, max = 20) => {
    const files = newFiles.filter((val) => {
        if (val.fieldname === nameFile && !val.mimetype.startsWith("image"))
            throw new ValidationError(`Please provider ${nameFile} type png|jpg|jpge...!`);
        return val.fieldname === nameFile;
    });

    const calc = files.length + fileOld.length - deleteFile.length;
    if (calc > max || calc < min) {
        throw new ValidationError(`Field ${name} is required lesster ${max} and greater ${min}!`);
    }
    const balanceFile = fileOld.filter((val) => !deleteFile.includes(val));

    return { newFile: [...files], oldFile: balanceFile, fileDel: deleteFile || [] };
};

module.exports = {
    validateCreatedOneImage,
    validateCreatedMultipleImage,
    validateUpdatedOneImage,
    validateUpdateMultipleImage,
};

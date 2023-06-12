const filterField = (object, ...rest) => {
    const data = {};
    rest.forEach((val) => (data[val] = object[val]));
    return data;
};

const removeField = (object, ...rest) => {
    const data = { ...object };
    rest.forEach((val) => {
        delete data[val];
    });
    return data;
};

module.exports = {
    filterField,
    removeField,
};

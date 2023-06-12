const checkType = (value) => Object.prototype.toString.call(value).slice(8, -1);

const removeInvalidFields = (data = {}, ...rest) => {
    return Object.keys(data).reduce((acc, curr) => {
        if (rest.includes(curr)) {
            acc[curr] = data[curr];
            return acc;
        }
        const type = checkType(data[curr]);
        if (type === "Null" || type === "Undefined") {
            return acc;
        }
        if (type === "String" || type === "Number" || type === "Boolean") {
            acc[curr] = data[curr];
            return acc;
        }
        if (type === "Object") {
            acc[curr] = removeInvalidFields(data[curr]);
            return acc;
        }
        if (type === "Array") {
            acc[curr] = data[curr].map((val) => (checkType(val) === "String" ? val : removeInvalidFields(val)));
            return acc;
        }
        return acc;
    }, {});
};

module.exports = {
    removeInvalidFields,
};

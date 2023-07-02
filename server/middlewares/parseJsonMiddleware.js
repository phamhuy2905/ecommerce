const checkType = (value) => Object.prototype.toString.call(value).slice(8, -1);

const parseJson = (body) => {
    const data = { ...body };
    const keys = Object.keys(data);
    keys.forEach((val) => {
        const check = checkType(data[val]);
        if (check === "String") {
            if (
                /^[\],:{}\s]*$/.test(
                    data[val]
                        .toString()
                        .replace(/\\["\\\/bfnrtu]/g, "@")
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
                )
            ) {
                data[val] = JSON.parse(data[val]);
            }
        }
    });
    return data;
};

const parseJsonMiddleware = (req, res, next) => {
    const data = parseJson(req.body);
    req.body = data;
    next();
};

module.exports = parseJsonMiddleware;

const expiresDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
const generateCookie = (res, key, token) => {
    res.cookie(key, token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        expires: expiresDate,
    });
};

module.exports = {
    generateCookie,
};

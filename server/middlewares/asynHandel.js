const asyncHandel = (fc) => (req, res, next) => {
    fc(req, res, next).catch(next);
};

module.exports = asyncHandel;

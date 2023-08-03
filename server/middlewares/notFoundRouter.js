const notFountRouter = (req, res, next) => {
    res.status(400).json({
        status: 400,
        success: false,
        message: "Router not found",
    });
};

module.exports = notFountRouter;

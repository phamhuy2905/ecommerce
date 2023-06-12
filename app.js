require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const app = require("./server");
const { globalMiddleware } = require("./middlewares/globalMiddleware");

/* router */
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/produc.router");
const discountRouter = require("./routers/discount.router");
const checkoutRouter = require("./routers/checkout.router");
/* router */

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParse());

/* router */
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/discount", discountRouter);
app.use("/api/v1/checkout", checkoutRouter);
/* router */

app.use(globalMiddleware);
app.use("/", (req, res, next) => {
    res.status(400).json({
        success: false,
        message: "Router not found",
    });
});

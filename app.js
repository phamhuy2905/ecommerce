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
const { exists, setnx, incrBy } = require("./helper/redis");
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

app.use("/test", async (req, res, next) => {
    const keyName = "iphone13";
    const slTonKho = 10;
    const slMua = 1;
    const check = await exists(keyName);
    console.log(check);
    // console.log(check);
    // if (!check) {
    //     console.log(123);
    //     await setnx(keyName, 0);
    // }

    // const slBan = await incrBy(keyName, slMua);
    // if (slBan > slTonKho) {
    //     res.json("qua roi");
    //     return;
    // }
    // if (slBan > slTonKho) {
    //     await setnx("dabanra", slBan);
    // }

    res.json("ok");
});

app.use(globalMiddleware);
app.use("/", (req, res, next) => {
    res.status(400).json({
        success: false,
        message: "Router not found",
    });
});

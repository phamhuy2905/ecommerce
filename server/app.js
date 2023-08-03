require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const app = require("./server");
const { globalMiddleware } = require("./middlewares/globalMiddleware");
const notFountRouter = require("./middlewares/notFoundRouter");
global.__dirPath = "http://localhost:3001/";

require("./factories");
//
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);
app.use("/assets", express.static("./assets"));
app.use(morgan("dev"));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cookieParse());
app.use("/", require("./routers"));
app.use(globalMiddleware);
app.use("/", notFountRouter);

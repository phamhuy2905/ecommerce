require("./dbs/init.mongo");
const express = require("express");
const { app: appConfig } = require("./config/config.mongodb");
const app = express();

app.listen(appConfig.port, () => {
    console.log(`Server is running on PORT ${appConfig.port}`);
});

module.exports = app;

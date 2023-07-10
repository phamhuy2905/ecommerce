require("./dbs/init.mongo");
const express = require("express");
const { app: appConfig } = require("./config/config.mongodb");
const app = express();
//
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const SocketService = require("./services/socket.service");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
global._io = io;
global.mapOnline = new Map();
global.arrOnline = [];

// global._io.use((_socket, next) => {
//     global._io.on("connection", (socket) => {
//         socket.on("message", validatorSocket(createMessageSocket));
//     });
//     next();
// });
global._io.on("connection", SocketService.connect);

app.listen(appConfig.port, () => {
    console.log(`Server is running on PORT ${appConfig.port}`);
});

server.listen(4000);

module.exports = app;

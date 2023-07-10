const { createMessage } = require("../repositories/message.repo");
const { createLatestMessage } = require("../repositories/latest.repo");
class SocketService {
    static connect(socket) {
        socket.on("message", async (data) => {
            const { senderId, recevierId, message } = data;
            const newMessage = await createMessage({ senderId, recevierId, message });
            const newLatestMessage = await createLatestMessage({
                senderId,
                recevierId,
                message,
                latestRead: Date.now(),
            });
            const socketId = mapOnline.get(recevierId);
            const newData = { newMessage, newLatestMessage };
            socket.to(socketId).emit("message", newData);
            socket.emit("message", newData);
        });
        socket.on("online", (userId) => {
            mapOnline.set(userId, socket.id);
            const foundConnect = arrOnline.findIndex((val) => val.userId === userId);
            if (foundConnect === -1) {
                arrOnline.push({ userId, socketId: socket.id });
            }
            _io.sockets.emit("online", arrOnline);
        });
        socket.on("disconnect", () => {
            const foundConnect = arrOnline.findIndex((val) => val.socketId === socket.id);
            if (foundConnect !== -1) {
                arrOnline.splice(foundConnect, 1);
            }
            _io.sockets.emit("online", arrOnline);
        });
    }
}
module.exports = SocketService;

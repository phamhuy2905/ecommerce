import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { LatestMessage, MessageType, UserOnlineType } from "../types/chat.type";
const host = "http://localhost:4000";
const _socket = io(host);
class SocketService {
    socket: Socket<DefaultEventsMap, DefaultEventsMap> = _socket;
    onOnline: (data: UserOnlineType[]) => void = () => {};
    onMessage: ({
        newMessage,
        newLatestMessage,
    }: {
        newMessage: MessageType;
        newLatestMessage: LatestMessage;
    }) => void = () => {};
    onConnect: () => void = () => {};
    connect() {
        this.socket.connect();
        this.socket.on("connect", () => {});
        this.socket.on("online", this.onOnline);
        this.socket.on("message", this.onMessage);
    }
    online(userId: string) {
        this.socket.emit("online", userId);
    }
}

export default new SocketService();

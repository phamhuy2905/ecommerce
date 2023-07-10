import { AiOutlineSend } from "react-icons/ai";
import SocketService from "../../../../services/socket.service";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
function FormChat() {
    const { data } = useSelector((state: RootState) => state.chat);
    const [message, setMessage] = useState<string>("");
    const handleEmit = () => {
        if (!message) return;
        SocketService.socket.emit("message", { ...data, message });
        setMessage("");
    };
    return (
        <div className="absolute bottom-0 left-0 flex w-full items-center  border-t-[1px] border-[#ddd] bg-red-300">
            <input
                className="w-full px-3 py-3 text-[14px] outline-none"
                type="text"
                placeholder="Nhập nội dung tin nhắn"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <AiOutlineSend
                onClick={handleEmit}
                className="absolute  right-3 cursor-pointer text-[20px] text-gray-700"
            />
        </div>
    );
}

export default FormChat;

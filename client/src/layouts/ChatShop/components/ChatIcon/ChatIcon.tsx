import { BsFillChatLeftFill } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/store";
import { changeStatusChat } from "../../../../redux/actions/chat.slice";

function ChatIcon() {
    const dispatch = useAppDispatch();
    return (
        <div
            onClick={() => dispatch(changeStatusChat(false))}
            className="fixed bottom-0 right-5 flex cursor-pointer items-center rounded-[5px] bg-white px-2 py-2 text-blue-500"
            style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" }}
        >
            <BsFillChatLeftFill className="text-[30px]" />
            <p className="ml-2 text-[17px]">Chat</p>
        </div>
    );
}

export default ChatIcon;

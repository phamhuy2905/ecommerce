import { CiSquareChevDown } from "react-icons/ci";
import ListChat from "./components/ListChat";
import { useAppDispatch } from "../../redux/store";
import { changeStatusChat } from "../../redux/actions/chat.slice";
import DataMessage from "./components/DataMessage";
function ChatShop() {
    const dispatch = useAppDispatch();

    return (
        <div
            className="fixed bottom-0 right-0 z-20 h-[500px] w-[640px] bg-white"
            style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" }}
        >
            <div className="flex h-full w-full flex-col">
                <div className="flex items-center justify-between border-b-[1px] border-[#ddd] px-3 py-3">
                    <p className="text-[18px] font-semibold  text-blue-600">Chat</p>
                    <CiSquareChevDown
                        onClick={() => dispatch(changeStatusChat(true))}
                        className="cursor-pointer text-[24px] text-gray-500"
                    />
                </div>
                <div className="flex h-full w-full ">
                    <ListChat />
                    <DataMessage />
                </div>
            </div>
        </div>
    );
}

export default ChatShop;

import { Props } from "../../types";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ChatShop from "../ChatShop";
import ChatIcon from "../ChatShop/components/ChatIcon";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import socketService from "../../services/socket.service";
import { useAuthContext } from "../../context/auth.context";
import { addDataLatestMessage, addDataMessge, setUserOnline } from "../../redux/actions/chat.slice";
import { LatestMessage, MessageType, UserOnlineType } from "../../types/chat.type";
import { useEffect } from "react";
let isConnect = true;
function DefaultLayout({ children }: Props) {
    const { profile } = useAuthContext();
    const { isHiddentChat } = useSelector((state: RootState) => state.chat);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (profile && isConnect) {
            socketService.online(profile._id);
            socketService.onOnline = (data: UserOnlineType[]) => {
                dispatch(setUserOnline(data));
            };
            socketService.onMessage = ({
                newMessage,
                newLatestMessage,
            }: {
                newMessage: MessageType;
                newLatestMessage: LatestMessage;
            }) => {
                dispatch(addDataMessge(newMessage));
                dispatch(addDataLatestMessage(newLatestMessage));
            };
            socketService.connect();
            isConnect = false;
        }
    }, [profile?._id]);

    return (
        <div>
            <Header />
            {children}
            <Footer />
            {isHiddentChat ? <ChatIcon /> : <ChatShop />}
        </div>
    );
}

export default DefaultLayout;

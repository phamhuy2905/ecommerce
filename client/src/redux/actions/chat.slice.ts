import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType, LatestMessage, MessageType, UserOnlineType } from "../../types/chat.type";

interface initialStateType {
    isHiddentChat: boolean;
    data: ChatType;
    listOnline: UserOnlineType[];
    dataMessage: MessageType[];
    dataLatestMessage: LatestMessage[];
}
const initialState: initialStateType = {
    isHiddentChat: true,
    data: {
        senderId: "",
        recevierId: "",
        nameRecevier: "",
        message: "",
    },
    dataMessage: [],
    listOnline: [],
    dataLatestMessage: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeStatusChat: (state, action: PayloadAction<boolean>) => {
            state.isHiddentChat = action.payload;
        },
        chooseShopChat: (state, action: PayloadAction<ChatType>) => {
            state.isHiddentChat = false;
            state.data = action.payload;
        },
        setUserOnline: (state, action: PayloadAction<UserOnlineType[]>) => {
            state.listOnline = action.payload;
        },
        setDataMessage: (state, action: PayloadAction<MessageType[]>) => {
            state.dataMessage = action.payload;
        },
        addDataMessge: (state, action: PayloadAction<MessageType>) => {
            state.dataMessage.push(action.payload);
        },
        setDataLatestMessage: (state, action: PayloadAction<LatestMessage[]>) => {
            state.dataLatestMessage = action.payload;
        },
        addDataLatestMessage: (state, action: PayloadAction<LatestMessage>) => {
            const { senderId, recevierId } = action.payload;
            const foundLatest = state.dataLatestMessage.findIndex((val) => {
                return (
                    (val.senderId._id === senderId._id && val.recevierId._id === recevierId._id) ||
                    (val.senderId._id === recevierId._id && val.recevierId._id === senderId._id)
                );
            });
            if (foundLatest !== -1) {
                state.dataLatestMessage[foundLatest] = action.payload;
            } else {
                state.dataLatestMessage.push(action.payload);
            }
        },
    },
});

export const {
    changeStatusChat,
    chooseShopChat,
    setUserOnline,
    setDataMessage,
    addDataMessge,
    setDataLatestMessage,
    addDataLatestMessage,
} = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;

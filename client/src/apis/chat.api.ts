import { LatestMessageResponse, MessageTypeResponse } from "../types/chat.type";
import http from "../utils/http";

export const getMessage = async ({ recevierId, senderId }: { recevierId: string; senderId: string }) => {
    return (await http.instance.get<MessageTypeResponse>(`/chat/${senderId}/${recevierId}`)).data.data;
};

export const getLatestMessage = async ({ userId }: { userId: string }) => {
    return (await http.instance.get<LatestMessageResponse>(`/chat/latest/${userId}`)).data.data;
};

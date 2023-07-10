import { ResponseSuccessData } from "./success.type";

export interface ChatType {
    senderId: string;
    recevierId: string;
    message: string;
    nameRecevier: string;
}

export interface LatestMessage {
    _id: string;
    senderId: {
        _id: string;
        fullName: string;
        avatar?: string;
    };
    recevierId: {
        _id: string;
        fullName: string;
        avatar?: string;
    };
    message: string;
    latestRead: string;
    isReaded: boolean;
    createdAt: Date;
    updatedAt: string;
    __v: number;
}

export interface MessageType {
    _id: string;
    senderId: {
        _id: string;
        fullName: string;
        avatar?: string;
    };
    recevierId: {
        _id: string;
        fullName: string;
        avatar?: string;
    };
    message: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: string;
    __v: number;
}

export interface UserOnlineType {
    socketId: string;
    userId: string;
}

export interface LatestMessageResponse extends ResponseSuccessData<LatestMessage[]> {}
export interface MessageTypeResponse extends ResponseSuccessData<MessageType[]> {}

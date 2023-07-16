import { ResponseSuccessData } from "./success.type";

export interface ProfileType {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    address?: string;
    address2?: string;
    phoneNumber?: string | number;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProfileResponseType extends ResponseSuccessData<ProfileType> {}

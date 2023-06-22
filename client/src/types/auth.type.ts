import { ResponseSuccessData } from "./success.type";

type TypeRole = "0001" | "0002";
export interface UserType {
    _id: string;
    fullName: string;
    email: string;
    role: TypeRole;
    avatar?: string;
    // role: '0001' | '0002'
}
export interface AuthLogin {
    email: string;
    password: string;
}

export interface AuthRegister {
    email: string;
    fullName: string;
    password: string;
    password_confirm: string;
}
export type AuthResponseLogin = ResponseSuccessData<{
    accessToken: string;
    user: UserType;
}>;

export type AuthResponseRegister = ResponseSuccessData<{
    user: UserType;
}>;

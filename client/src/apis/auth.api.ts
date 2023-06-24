import { AuthLogin, AuthRegister, AuthResponseLogin, AuthResponseRegister } from "../types/auth.type";
import { SuccessType } from "../types/success.type";
import http from "../utils/http";

export const authRegister = (data: Omit<AuthRegister, "password_confirm">) => {
    return http.instance.post<AuthResponseRegister>("auth/register", data);
};

export const authLogin = (data: AuthLogin) => {
    return http.instance.post<AuthResponseLogin>("auth/login", data);
};

export const refreshToken = async () => {
    return await http.instance.post<AuthResponseLogin>("auth/refreshToken");
};

export const authLogout = async () => {
    return await http.instance.post<SuccessType>("auth/logout");
};

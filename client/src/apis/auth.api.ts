import { AuthLogin, AuthRegister, AuthResponseLogin, AuthResponseRegister } from "../types/auth.type";
import http from "../utils/http";

export const authRegister = (data: Omit<AuthRegister, "password_confirm">) => {
    return http.instance.post<AuthResponseRegister>("auth/register", data);
};

export const authLogin = (data: AuthLogin) => {
    return http.instance.post<AuthResponseLogin>("auth/login", data);
};

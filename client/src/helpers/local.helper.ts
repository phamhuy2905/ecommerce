import { UserType } from "../types/auth.type";
import { initTialStateType } from "../types/slice/cart.type";

const saveTokenLocal = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
};

const getTokenLocal = () => {
    return localStorage.getItem("accessToken") || "";
};

const remmoveTokenLocal = () => {
    return localStorage.removeItem("accessToken");
};

const saveProfileLocal = (data: UserType) => {
    localStorage.setItem("profile", JSON.stringify(data));
};

const getProfileLocal = (): UserType => {
    const profile = localStorage.getItem("profile") || "0";
    return JSON.parse(profile);
};
const remmoveProfileLocal = () => {
    return localStorage.removeItem("profile");
};

const getLocalCart = (): initTialStateType => {
    const carts = localStorage.getItem("carts") || "0";
    return JSON.parse(carts) || { carts: [], total: 0, metaTotal: 0, cartMetas: [] };
};

const setLocalCart = (carts: initTialStateType) => {
    return localStorage.setItem("carts", JSON.stringify(carts));
};
const clearLocalCart = () => {
    localStorage.removeItem("carts");
};

export {
    saveTokenLocal,
    getTokenLocal,
    remmoveTokenLocal,
    saveProfileLocal,
    getProfileLocal,
    remmoveProfileLocal,
    getLocalCart,
    setLocalCart,
    clearLocalCart,
};

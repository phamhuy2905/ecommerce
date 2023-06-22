import { UserType } from "../types/auth.type";

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

export { saveTokenLocal, getTokenLocal, remmoveTokenLocal, saveProfileLocal, getProfileLocal, remmoveProfileLocal };

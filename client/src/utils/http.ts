import axios, { type AxiosInstance } from "axios";
import { AuthResponseLogin, UserType } from "../types/auth.type";
import {
    getProfileLocal,
    getTokenLocal,
    remmoveProfileLocal,
    remmoveTokenLocal,
    saveProfileLocal,
    saveTokenLocal,
} from "../helpers/local.helper";

class http {
    instance: AxiosInstance;
    private accessToken: string;
    profile: UserType;

    constructor() {
        this.accessToken = getTokenLocal();
        this.profile = getProfileLocal();
        this.instance = axios.create({
            baseURL: "http://localhost:3001/api/v1/",
            headers: {
                "Content-Type": "application/json",
            },
        });
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config;
                if (url === "auth/login" || url === "auth/refreshToken") {
                    this.accessToken = (response.data as AuthResponseLogin).data.accessToken;
                    this.profile = (response.data as AuthResponseLogin).data.user;
                    saveTokenLocal(this.accessToken);
                    saveProfileLocal(this.profile);
                    return response;
                } else if (url === "auth/logout") {
                    this.accessToken = "";
                    remmoveTokenLocal();
                    remmoveProfileLocal();
                }
                return response;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        this.instance.interceptors.request.use(
            (config) => {
                if (this.accessToken) {
                    config.headers.Authorization = `Bearer ${this.accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
}

export default new http();

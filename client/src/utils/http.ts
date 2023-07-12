import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { AuthResponseLogin, UserType } from "../types/auth.type";
import {
    getProfileLocal,
    getTokenLocal,
    remmoveProfileLocal,
    remmoveTokenLocal,
    saveProfileLocal,
    saveTokenLocal,
} from "../helpers/local.helper";
import { refreshToken } from "../apis/auth.api";

class http {
    instance: AxiosInstance;
    private accessToken: string;
    profile: UserType;
    refreshToken: Promise<AxiosResponse<AuthResponseLogin, any>> | null;

    constructor() {
        this.refreshToken = null;
        this.accessToken = getTokenLocal();
        this.profile = getProfileLocal();
        this.instance = axios.create({
            baseURL: "http://localhost:3001/api/v1/",
            headers: {
                // "Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
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
            (error) => {
                if (error.response.data.status === 401 && error.response.data.message === "TokenExpiredError") {
                    this.refreshToken = this.refreshToken ? this.refreshToken : refreshToken(this.profile._id);
                    this.refreshToken
                        .then((res) => {
                            this.accessToken = res.data.data.accessToken;
                            this.profile = res.data.data.user;
                            error.response.config.Authorization = this.accessToken;
                            this.instance(error.response.config);
                        })
                        .catch((err) => console.log(err))
                        .finally(() => (this.refreshToken = null));
                    return;
                } else if (error.response.data.status === 401) {
                    this.accessToken = "";
                    remmoveTokenLocal();
                    remmoveProfileLocal();
                    window.location.reload();
                    return;
                }
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

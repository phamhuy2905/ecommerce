import axios, { type AxiosError } from "axios";
import { ErrorType } from "../types/error.type";

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
    return axios.isAxiosError(error);
};

export const errorResponse = (error: unknown) => {
    const err = isAxiosError<ErrorType>(error);
    if (!err) return;

    const response = error.response?.data;
    if (response?.status) {
        return response.message;
    }
    return error.message;
};

export interface ErrorType {
    success: boolean;
    status: number;
    message: string;
}

export interface ResponseErrorData<T> extends ErrorType {
    data: T;
}

export interface SuccessType {
    success: boolean;
    status: number;
    message: string;
}

export interface ResponseSuccessData<T> extends SuccessType {
    data: T;
}

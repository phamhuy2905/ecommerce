import { path } from "../helpers/path.helper";
import { SuccessResponseOrder } from "../types/order.type";
import http from "../utils/http";

export interface CancelOrderByUser {
    shopId: string;
    reasonCancel: string;
}

const getMyOrder = async () => {
    const orders = await http.instance.get<SuccessResponseOrder>(`${path.api.checkout}`);
    return orders.data.data;
};

const cancelOrderByUser = async ({ id, data }: { id: string; data: CancelOrderByUser }) => {
    const orders = await http.instance.patch<any>(`${path.api.order.cancelByUser}/${id}`, data);
    return orders.data;
};

const requestCancelByUser = async ({ id, shopId }: { id: string; shopId: string }) => {
    const orders = await http.instance.patch<any>(`${path.api.order.requestCancelByUser}/${id}`, { shopId });
    return orders.data;
};
export { getMyOrder, cancelOrderByUser, requestCancelByUser };

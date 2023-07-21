import { path } from "../../helpers/path.helper";
import http from "../../utils/http";
import { OrdersResponse, OrderResponse, CancelOrderByAdmin } from "../types/order.type";

const getAllOrder = async () => {
    const orders = await http.instance.get<OrdersResponse>(path.apiAdmin.order.getAll);
    return orders.data.data;
};
const getAllOrderPending = async () => {
    const orders = await http.instance.get<OrdersResponse>(path.apiAdmin.order.getAllOrderPending);
    return orders.data.data;
};

const getOneOrder = async (id: string) => {
    const orders = await http.instance.get<OrderResponse>(`${path.apiAdmin.order.getOne}/${id}`);
    return orders.data.data;
};
const cancelOrderByAdmin = async ({ id, data }: { id: string; data: CancelOrderByAdmin }) => {
    const orders = await http.instance.patch<OrderResponse>(`${path.apiAdmin.order.cancel}/${id}`, data);
    return orders.data.data;
};
const acceptCancelByAdmin = async ({ id, shopId }: { id: string; shopId: string }) => {
    const orders = await http.instance.patch<OrderResponse>(`${path.apiAdmin.order.acceptCancelByAdmin}/${id}`, {
        shopId,
    });
    return orders.data.data;
};
const acceptOrder = async ({ id, shopId }: { id: string; shopId: string }) => {
    const orders = await http.instance.patch<OrderResponse>(`${path.apiAdmin.order.acceptOrder}/${id}`, {
        shopId,
    });
    return orders.data.data;
};

export { getAllOrder, getOneOrder, cancelOrderByAdmin, acceptCancelByAdmin, acceptOrder, getAllOrderPending };

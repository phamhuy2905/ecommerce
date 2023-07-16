import { path } from "../helpers/path.helper";
import { SuccessResponseOrder } from "../types/order.type";
import http from "../utils/http";

const getMyOrder = async () => {
    const discount = await http.instance.get<SuccessResponseOrder>(`${path.api.checkout}`);
    return discount.data.data;
};

export { getMyOrder };

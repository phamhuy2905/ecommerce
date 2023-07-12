import { SuccessResponseRevireCheckout } from "../types/checkout.type";
import http from "../utils/http";

const checkoutApi = async (data: any) => {
    const discount = await http.instance.post<SuccessResponseRevireCheckout>(`/checkout`, data);
    return discount.data.data;
};

export { checkoutApi };

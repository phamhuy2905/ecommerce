import { path } from "../helpers/path.helper";
import { SuccessResponseRevireCheckout } from "../types/checkout.type";
import http from "../utils/http";

const checkoutReviewApi = async (data: any) => {
    const discount = await http.instance.post<SuccessResponseRevireCheckout>(`${path.api.checkout}`, data);
    return discount.data.data;
};

export { checkoutReviewApi };

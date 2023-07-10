import { DiscountResponseType } from "../types/discount.type";
import http from "../utils/http";

const getDiscount = async (discountShop: string) => {
    const discount = await http.instance.get<DiscountResponseType>(`/discount/${discountShop}`);
    return discount.data.data;
};

export { getDiscount };

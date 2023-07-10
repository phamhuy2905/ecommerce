import http from "../utils/http";

const checkoutApi = async (data: any) => {
    const discount = await http.instance.post<any>(`/checkout`, data);
    return discount;
};

export { checkoutApi };

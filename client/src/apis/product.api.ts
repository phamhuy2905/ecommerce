import { path } from "../helpers/path.helper";
import { FilterProductType, ProductDetailResponseType, ProductResponseType } from "../types/product.type";
import http from "../utils/http";

const getProduct = (query: FilterProductType) => {
    return http.instance.get<ProductResponseType>(`${path.api.product}`, {
        params: query,
    });
};

const getProductDetail = (id: string) => {
    return http.instance.get<ProductDetailResponseType>(`${path.api.product}/${id}`);
};
export { getProduct, getProductDetail };

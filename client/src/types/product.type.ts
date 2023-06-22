import { ResponseSuccessData } from "./success.type";
export interface ProductType {
    _id: string;
    productShop: {
        _id: string;
        address?: string;
        fullName: string;
    };
    productName: string;
    productType: string;
    productThumbnail: string;
    productMultipleThumbnail: Array<string>;
    productQuantity: number;
    productPrice: number;
    ratingsAverage: number;
    productDescription: string;
}

export interface ProductResponseType
    extends ResponseSuccessData<{
        products: ProductType[];
        page: {
            itemsPerPage: number;
            totalPage: number;
            totalItems: number;
        };
    }> {}

export interface FilterProductType {
    page?: number;
    sort?: string;
    q?: string;
    "productPrice[gte]"?: number;
    "productPrice[gt]"?: number;
    "productPrice[lte]"?: number;
    "productPrice[lt]"?: number;
}

export interface ProductTypeDetaill extends ProductType {
    productAttribute: {
        _id?: string;
        manufacture?: string;
        size?: string[];
        material?: string;
        special?: any;
    };
}

export type ProductDetailResponseType = ResponseSuccessData<ProductTypeDetaill>;
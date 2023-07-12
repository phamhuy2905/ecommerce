import { ResponseSuccessData } from "./success.type";
export interface ProductType {
    _id: string;
    productShop: {
        _id: string;
        address?: string;
        fullName: string;
    };
    productBrand: string;
    productName: string;
    productType: string;
    productThumbnail: string;
    productMultipleThumbnail: Array<string>;
    productQuantity: number | string;
    productPrice: number | string;
    ratingsAverage: number | string;
    productDescription: string;
}

export interface TypePage {
    itemsPerPage: number;
    totalPage: number;
    totalItems: number;
}
export interface ProductResponseType
    extends ResponseSuccessData<{
        products: ProductType[];
        page: TypePage;
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
        color?: string[];
    };
}

export interface AddProductType {
    productName: string;
    productType: string;
    productQuantity: number | string;
    productPrice: number | string;
    productDescription: string;
    productBrand: string;
    size?: string[];
    color?: string[];
    material?: string;
}

export interface ProductAttributeType {
    size?: string[];
    material?: string;
    color?: string[];
}

export type ProductDetailResponseType = ResponseSuccessData<ProductTypeDetaill>;

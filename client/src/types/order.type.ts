import { ResponseSuccessData } from "./success.type";

export interface Orders {
    _id: string;
    userId: string;
    shopOrders: ShopOrder[];
    orderPayment: string;
    orderCheckOut: OrderCheckOut;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ShopOrder {
    shopId: ShopId;
    itemProducts: ItemProductOrder[];
    orderStatus: string;
    reasonCancel: string;
    noteShop?: string;
    _id: string;
}

export interface ShopId {
    _id: string;
    fullName: string;
    avatar?: string;
}

export interface ItemProductOrder {
    productId: ProductId;
    price: number;
    quantity: number;
    size: string;
    color: string;
    discountCode: string;
    discountValue: number;
    discountType: "amount" | "percen";
    _id: string;
}

export interface ProductId {
    _id: string;
    productName: string;
    productType: string;
    productThumbnail: string;
    productSlug: string;
}

export interface OrderCheckOut {
    totalPrice: number;
    totalDiscount: number;
    totalBalance: number;
    totalShipping: number;
}

export interface SuccessResponseOrder extends ResponseSuccessData<Orders[]> {}

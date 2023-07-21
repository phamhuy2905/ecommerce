import { ResponseSuccessData } from "./success.type";

export interface Orders {
    _id: string;
    userId: string;
    shopOrders: ShopOrder[];
    orderPayment: string;
    orderCheckOut: OrderCheckOut;
    orderShipping: OderShipping;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ShopOrder {
    shopId: ShopId;
    itemProducts: ItemProductOrder[];
    orderStatus:
        | "pending"
        | "shipped"
        | "confirmed"
        | "cancel_by_user"
        | "cancel_by_shop"
        | "cancel_by_admin"
        | "deliverid";
    reasonCancel: string;
    noteShop?: string;
    requestCancel: boolean;
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
    discountCode: string | null;
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
export interface OderShipping {
    province: string;
    district: string;
    ward: string;
    address: string;
    address2?: string;
    fullName: string;
    phoneNumber: string | number;
}

export interface SuccessResponseOrder extends ResponseSuccessData<Orders[]> {}

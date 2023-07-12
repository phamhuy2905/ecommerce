import { ResponseSuccessData } from "./success.type";

export interface CheckOutType {
    userId: string;
    shopOrders: ShopOrder[];
}

export interface ShopOrder {
    shopId: string;
    itemProducts: ItemProduct[];
    shopName: string;
}

export interface ItemProduct {
    productId: string;
    name: string;
    thumbnail: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
    discountCode?: string;
    discountValue?: number;
    discountType?: "amount" | "percen";
}

export interface NewItemProduct {
    productId: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    discountCode?: string;
    discountValue: number;
    discountType: string;
}

export interface DataTotal {
    totalPrice: number;
    totalDiscount: number;
    totalBalance: number;
    totalShipping: number;
}

export interface NewShopOrder {
    shopId: string;
    itemProducts: NewItemProduct[];
    dataTotal: DataTotal;
}

export interface SuccessResponseRevireCheckout extends ResponseSuccessData<NewShopOrder> {}

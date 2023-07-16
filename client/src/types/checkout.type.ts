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
    price: string | number;
    quantity: string | number;
    size: string | number;
    color: string;
    discountCode: string | null;
    discountValue: number;
    discountType?: string | null;
}

export interface DataTotal {
    totalPrice: number;
    totalDiscount: number;
    totalBalance: number;
    totalShipping: number;
}

export interface NewShopOrder {
    newShopOrders: {
        shopId: string;
        itemProducts: NewItemProduct[];
    }[];
    dataTotal: DataTotal;
}

export interface SuccessResponseRevireCheckout extends ResponseSuccessData<NewShopOrder> {}

///
export interface ShopOdersReviewType {
    shopOrders: ItemShopOrderReviewType[];
}

export interface ItemShopOrderReviewType {
    shopId: string;
    itemProducts: ItemProductReviewType[];
    noteShop?: string;
}
export interface ItemProductReviewType {
    productId: string;
    price: string | number;
    quantity: string | number;
    size: string | number;
    color: string;
    discountCode: string | null;
    discountValue: number;
    discountType?: string | null;
}

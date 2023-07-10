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

export interface CartProductType {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
    quantity: number;
    discount?: number | string;
    size: string;
    color: string;
    isChecked: boolean;
}
export interface CartType {
    shopId: string;
    shopName: string;
    itemProducts: CartProductType[];
    totalPrice: number;
    metaTotalPrice: number;
}

export interface initTialStateType {
    carts: CartType[];
    total: number;
    metaTotal: number;
}

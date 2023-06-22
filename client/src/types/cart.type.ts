export interface CartType {
    id: string;
    name: string;
    thumbnail: string;
    price: number;
    quantity: number;
    discount?: number | string;
}

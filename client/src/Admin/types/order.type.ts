export interface OrdersResponse {
    success: boolean;
    staus: number;
    message: string;
    data: Data;
}

export interface OrderResponse {
    success: boolean;
    staus: number;
    message: string;
    data: Order;
}

export interface Data {
    orders: Order[];
    page: Page;
}

export interface Order {
    _id: string;
    userId: UserOrder;
    shopOrders: ShopOrder[];
    orderShipping: OrderShipping;
    orderPayment: string;
    orderCheckOut: OrderCheckOut;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ShopOrder {
    shopId: Shop;
    itemProducts: ItemProduct[];
    orderStatus:
        | "pending"
        | "shipped"
        | "confirmed"
        | "cancel_by_user"
        | "cancel_by_shop"
        | "cancel_by_admin"
        | "deliverid";
    reasonCancel: string;
    requestCancel: boolean;
    _id: string;
    noteShop?: string;
}
export interface UserOrder {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
    phoneNumber?: string;
}

export interface Shop {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    address: string;
    address2?: string;
    phoneNumber?: number;
    avatar?: string;
}

export interface ItemProduct {
    productId: Product;
    price: number;
    quantity: number;
    size: string;
    color: string;
    discountCode: string | null;
    discountValue: number;
    discountType: "amount" | "percen";
    _id: string;
}

export interface Product {
    _id: string;
    productName: string;
    productType: string;
    productThumbnail: string;
    productSlug: string;
}

export interface OrderShipping {
    ward: string;
    district: string;
    province: string;
    address: string;
    address2?: string;
    phoneNumber: string | number;
    fullName: string;
}

export interface OrderCheckOut {
    totalPrice: number;
    totalDiscount: number;
    totalBalance: number;
    totalShipping: number;
}

export interface Page {
    itemsPerPage: number;
    totalItems: number;
    totalPage: number;
}

type MessageStatusOrder = {
    [key in
        | "pending"
        | "shipped"
        | "confirmed"
        | "cancel_by_user"
        | "cancel_by_shop"
        | "cancel_by_admin"
        | "deliverid"]: { status: string; color: string };
};

export const statusOrder: MessageStatusOrder = {
    pending: {
        status: "Chờ duyệt",
        color: "bg-orange-500",
    },
    shipped: {
        status: "Đang giao",
        color: "bg-blue-500",
    },
    confirmed: {
        status: "Đã xác nhận",
        color: "bg-yellow-500",
    },
    cancel_by_user: {
        status: "Hủy bởi người dùng",
        color: "bg-red-500",
    },
    cancel_by_shop: {
        status: "Hủy bởi shop",
        color: "bg-red-500",
    },
    cancel_by_admin: {
        status: "Hủy bởi admin",
        color: "bg-red-500",
    },
    deliverid: {
        status: "Đã nhận hàng",
        color: "bg-green-500",
    },
};

export interface CancelOrderByAdmin {
    shopId: string;
    reasonCancel: string;
}

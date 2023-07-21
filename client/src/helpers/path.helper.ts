export const path = {
    client: {
        home: "/",
        "shop-grid": "/shop-grid",
        login: "/login",
        register: "/register",
        detail: "/detail",
        cart: "/cart",
        profile: "/profile",
        order: "/order",
        registerShop: "/registerShop",
    },
    server: {
        home: "/admin",
        product: {
            all: "/admin/product",
            add: "/admin/add-product",
        },
        order: {
            all: "/admin/order",
            detail: "/admin/order-detail/:id",
            pending: "/admin/order-pending",
        },
    },
    api: {
        static: "/static",
        product: "/product",
        checkout: "/checkout",
        address: "/address",
        order: {
            cancelByUser: "/checkout/cancelOrderbyUser",
            requestCancelByUser: "/checkout/requestCancelByUser",
        },
    },
    apiAdmin: {
        order: {
            getAll: "/checkout/getAllOrder",
            getAllOrderPending: "/checkout/getAllOrderPending",
            getOne: "/checkout/getOneOrderByAdmin",
            cancel: "/checkout/cancelOrderbyAdmin",
            acceptCancelByAdmin: "/checkout/acceptCancelByAdmin",
            acceptOrder: "/checkout/acceptOrder",
        },
        static: {
            category: "/static/category",
        },
    },
};

import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { CartProductType, CartType } from "../types/cart.type";

interface initTialStateType {
    carts: CartType[];
    total: number;
}

const getLocalCart = (): initTialStateType => {
    const carts = localStorage.getItem("carts") || "0";
    return JSON.parse(carts) || { carts: [], total: 0 };
};

const setLocalCart = (carts: initTialStateType) => {
    return localStorage.setItem("carts", JSON.stringify(carts));
};
const clearLocalCart = () => {
    localStorage.removeItem("carts");
};

const initialState: initTialStateType = getLocalCart() || {
    carts: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<{ item: CartProductType; shopId: string; shopName: string }>) {
            const payload = action.payload;
            const foundShop = state.carts.findIndex((val) => val.shopId === payload.shopId);
            if (foundShop !== -1) {
                const products = state.carts[foundShop];
                const foundProduct = products.itemProducts.findIndex(
                    (value) =>
                        value.id === payload.item.id &&
                        value.size === payload.item.size &&
                        value.color === payload.item.color
                );
                if (foundProduct !== -1) {
                    products.itemProducts[foundProduct].quantity += payload.item.quantity;
                } else {
                    products.itemProducts.push(payload.item);
                }
                state.carts[foundShop] = products;
                state.carts[foundShop].totalPrice = state.carts[foundShop].itemProducts.reduce(
                    (acc, curr) => acc + curr.quantity * curr.price,
                    0
                );
            } else {
                const totalPrice = payload.item.price * payload.item.quantity;
                const shop: CartType = {
                    shopId: payload.shopId,
                    shopName: payload.shopName,
                    itemProducts: [payload.item],
                    totalPrice,
                };
                state.carts.push(shop);
            }
            state.total = state.carts.reduce((acc, curr) => acc + curr.totalPrice, 0);

            setLocalCart(state);
        },
        removeItemCart(
            state,
            action: PayloadAction<{ productId: string; shopId: string; size: string; color: string }>
        ) {
            const payload = action.payload;
            const foundShop = state.carts.findIndex((val) => (val.shopId = payload.shopId));
            if (foundShop === -1) return;
            const foundProduct = state.carts[foundShop].itemProducts.findIndex(
                (val) => val.id === payload.productId && val.color === payload.color && val.size === payload.size
            );
            if (foundProduct === -1) return;
            state.carts[foundShop].itemProducts.splice(foundProduct, 1);
            if (!state.carts[foundShop].itemProducts.length) {
                state.carts = state.carts.filter((val) => val.shopId !== payload.shopId);
            } else {
                state.carts[foundShop].totalPrice = state.carts[foundShop].itemProducts.reduce(
                    (acc, curr) => acc + curr.quantity * curr.price,
                    0
                );
            }
            if (!state.carts.length) {
                state.total = 0;
                clearLocalCart();
                return;
            }
            state.total = state.carts.reduce((acc, curr) => acc + curr.totalPrice, 0);
            setLocalCart(state);
        },
    },
});

export const { addCart, removeItemCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

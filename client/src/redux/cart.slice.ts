import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../types/cart.type";

interface initTialStateType {
    carts: CartType[];
    total: number;
}

const getLocalCart = (): initTialStateType => {
    const carts = localStorage.getItem("carts") || "0";
    return JSON.parse(carts) || { carts: [], total: 0 };
};
console.log(getLocalCart());

const setLocalCart = (carts: initTialStateType) => {
    return localStorage.setItem("carts", JSON.stringify(carts));
};

const initialState: initTialStateType = getLocalCart() || {
    carts: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<CartType>) {
            const findCart = state.carts.findIndex((val) => val.id === action.payload.id);
            findCart !== -1
                ? (state.carts[findCart].quantity += action.payload.quantity)
                : state.carts.push(action.payload);
            state.total = state.carts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
            setLocalCart(state);
        },
        removeItemCart(state, action: PayloadAction<{ id: string }>) {
            state.carts = state.carts.filter((val) => val.id !== action.payload.id);
            state.total = state.carts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
            setLocalCart(state);
        },
    },
});

export const { addCart, removeItemCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

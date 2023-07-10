import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import { useDispatch } from "react-redux";
import discountReducer from "./checkout.slice";
import chatReducer from "./actions/chat.slice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        discount: discountReducer,
        chat: chatReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

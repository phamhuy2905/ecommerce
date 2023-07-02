import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearLocalCart, getLocalCart, setLocalCart } from "../helpers/local.helper";
import { CartProductType, CartType, initTialStateType } from "../types/slice/cart.type";

const initialState: initTialStateType = getLocalCart() || {
    carts: [],
    total: 0,
    metaTotal: 0,
    cartMetas: [],
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
                    metaTotalPrice: 0,
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

        checkedCart(state, action: PayloadAction<Pick<CartProductType, "id" | "size" | "color">>) {
            const { id: idProduct, color, size } = action.payload;
            state.carts.forEach((val) => {
                val.itemProducts.map((item) => {
                    if (item.id === idProduct && item.color === color && item.size === size) {
                        item.isChecked ? (item.isChecked = false) : (item.isChecked = true);
                    }
                });
            });
            const products = state.carts.flatMap((val) => val.itemProducts);
            state.metaTotal = products.reduce(
                (acc, curr) => acc + (curr.isChecked ? curr.quantity * curr.price : 0),
                0
            );
        },

        changeQuantity(
            state,
            action: PayloadAction<Pick<CartProductType, "id" | "size" | "color"> & { type: "incr" | "decr" }>
        ) {
            const { id: idProduct, type, color, size } = action.payload;
            state.carts.forEach((val) => {
                val.itemProducts.forEach((item) => {
                    if (item.id === idProduct && item.color === color && item.size === size) {
                        type === "incr" ? (item.quantity += 1) : (item.quantity -= 1);
                    }
                });
            });
            const products = state.carts.flatMap((val) => val.itemProducts);
            state.metaTotal = products.reduce(
                (acc, curr) => acc + (curr.isChecked ? curr.quantity * curr.price : 0),
                0
            );
        },
    },
});

export const { addCart, removeItemCart, checkedCart, changeQuantity } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { clearLocalCart, getLocalCart, setLocalCart } from "../helpers/local.helper";
import { CartProductType, CartType, initTialStateType, UpdateCartAfterOrderType } from "../types/slice/cart.type";

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

        checkedAllCart(state) {
            const check = state.carts.flatMap((val) => val.itemProducts).every((val) => val.isChecked);
            if (check) {
                state.carts.forEach((val) => val.itemProducts.forEach((item) => (item.isChecked = false)));
            } else {
                state.carts.forEach((val) => val.itemProducts.forEach((item) => (item.isChecked = true)));
            }

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

        updateCartAfterOrder(state, action: PayloadAction<UpdateCartAfterOrderType[]>) {
            const payload = action.payload;
            const arrShop = state.carts.map((item) => {
                const arrProduct = item.itemProducts.filter((val) => {
                    return !payload.some(
                        (value) => value.productId === val.id && value.color === val.color && value.size === val.size
                    );
                });
                return arrProduct.length
                    ? {
                          ...item,
                          itemProducts: arrProduct,
                          totalPrice: arrProduct.reduce((acc, curr) => acc + curr.quantity * curr.price, 0),
                      }
                    : null;
            });
            const filter = arrShop.filter((val) => val !== null) as CartType[];
            const total = filter.reduce((acc, curr) => acc + curr.totalPrice, 0);
            state.carts = filter;
            state.total = total;
            !total ? clearLocalCart() : setLocalCart({ carts: filter, metaTotal: 0, total });
        },
    },
});

export const { addCart, removeItemCart, checkedCart, changeQuantity, checkedAllCart, updateCartAfterOrder } =
    cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;

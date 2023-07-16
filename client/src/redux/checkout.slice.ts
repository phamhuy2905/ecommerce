import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
    CheckOutType,
    ItemProductReviewType,
    ItemShopOrderReviewType,
    SuccessResponseRevireCheckout,
} from "../types/checkout.type";
import http from "../utils/http";

export const postCheckoutReview = createAsyncThunk("checkout/review", async (data: any, _thunkApi) => {
    const review = await http.instance.post<SuccessResponseRevireCheckout>("checkout", data);
    return review.data.data;
});
export const createOrder = createAsyncThunk("checkout/created", async (data: any, _thunkApi) => {
    const newOrder = await http.instance.post<any>("checkout/created", data);
    return newOrder.data;
});

interface initialStateType {
    discountShop: CalcDiscountType[];
    shopOrders: ItemShopOrderReviewType[];
}
interface CalcDiscountType {
    id: string;
    totalDiscount: number;
}

const initialState: initialStateType = {
    discountShop: [],
    shopOrders: [],
};

const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {
        calcDiscount(state, action: PayloadAction<CalcDiscountType>) {
            const payload = action.payload;
            const foundDiscount = state.discountShop.findIndex((val) => val.id === payload.id);
            foundDiscount !== -1 ? state.discountShop.push(payload) : state.discountShop.splice(foundDiscount, 1);
        },
        checkOutReview(state, action: PayloadAction<CheckOutType>) {
            const { shopOrders } = action.payload;
            const dataShop = shopOrders.map((val) => {
                const itemProducts: ItemProductReviewType[] = val.itemProducts.map((value) => {
                    return {
                        productId: value.productId,
                        price: value.price,
                        quantity: value.quantity,
                        color: value.color || "",
                        size: value.size || "",
                        discountCode: value.discountCode || null,
                        discountValue: 0,
                    };
                });
                return { shopId: val.shopId, itemProducts };
            });
            state.shopOrders = dataShop;
        },

        dispatchCheckOutDiscount(
            state,
            action: PayloadAction<{ shopId: string; discountCode: string; discountValue: number }>
        ) {
            const foundShop = state.shopOrders.findIndex((val) => val.shopId === action.payload.shopId);
            if (foundShop === -1) return;
            state.shopOrders[foundShop].itemProducts = state.shopOrders[foundShop].itemProducts.map((val) => ({
                ...val,
                discountCode: action.payload.discountCode,
                discountValue: action.payload.discountValue,
            }));
        },

        dispatchCheckOutNote(state, action: PayloadAction<{ shopId: string; node: string }>) {
            const foundShop = state.shopOrders.findIndex((val) => val.shopId === action.payload.shopId);
            if (foundShop === -1) return;
            state.shopOrders[foundShop].noteShop = action.payload.node;
        },
    },
    extraReducers(builder) {
        builder.addCase(postCheckoutReview.fulfilled, (state, action) => {
            state.shopOrders = action.payload.newShopOrders;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    },
});

const discountReducer = discountSlice.reducer;
export const { calcDiscount, checkOutReview, dispatchCheckOutDiscount, dispatchCheckOutNote } = discountSlice.actions;
export default discountReducer;

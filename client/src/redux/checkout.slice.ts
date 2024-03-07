import { createSlice, createAsyncThunk, type PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
import {
    CheckOutType,
    ItemProductReviewType,
    ItemShopOrderReviewType,
    SuccessResponseRevireCheckout,
} from "../types/checkout.type";
import http from "../utils/http";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

// type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
// type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;

export const postCheckoutReview = createAsyncThunk("checkout/review", async (data: any, _thunkApi) => {
    try {
        const review = await http.instance.post<SuccessResponseRevireCheckout>("checkout", data);
        return review.data.data;
    } catch (error: any) {
        if (error.name === "AxiosError") return _thunkApi.rejectWithValue(error);
    }
});
export const createOrder = createAsyncThunk("checkout/created", async (data: any, _thunkApi) => {
    try {
        const newOrder = await http.instance.post<SuccessResponseRevireCheckout>("checkout/created", data);
        return newOrder.data;
    } catch (error: any) {
        if (error.name === "AxiosError") return _thunkApi.rejectWithValue(error);
    }
});

interface initialStateType {
    discountShop: CalcDiscountType[];
    shopOrders: ItemShopOrderReviewType[];
    addressId: string;
}
interface CalcDiscountType {
    id: string;
    totalDiscount: number;
}

const initialState: initialStateType = {
    discountShop: [],
    shopOrders: [],
    addressId: "",
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
        confirmAddressId(state, action: PayloadAction<string>) {
            state.addressId = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(postCheckoutReview.fulfilled, (state, action) => {
            if (action.payload) state.shopOrders = action.payload.newShopOrders;
        });
        builder
            .addCase(createOrder.fulfilled, (_state, _action) => {})
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith("/rejected"),
                (_state, _action) => {}
            );
    },
});

const discountReducer = discountSlice.reducer;
export const { calcDiscount, checkOutReview, dispatchCheckOutDiscount, dispatchCheckOutNote, confirmAddressId } =
    discountSlice.actions;
export default discountReducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
    discountShop: CalcDiscountType[];
}
interface CalcDiscountType {
    id: string;
    totalDiscount: number;
}

const initialState: initialStateType = {
    discountShop: [],
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
    },
});

const discountReducer = discountSlice.reducer;
export const { calcDiscount } = discountSlice.actions;
export default discountReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDetailResponseType, ProductResponseType, ProductType } from "../../types/product.type";
import http from "../../utils/http";

export const getProductAdmin = createAsyncThunk("product/get", async (page: number = 1, thunkAPI) => {
    const products = await http.instance.get<ProductResponseType>(`/product?page=${page}`);
    return products.data.data;
});
export const postProductAdmin = createAsyncThunk("product/add", async (data: FormData, thunkAPI) => {
    const product = await http.instance.post<ProductDetailResponseType>(`/product`, data);
    return product.data.data;
});

interface InitialStateType {
    products: ProductType[];
    page: {
        itemsPerPage: number;
        totalPage: number;
        totalItems: number;
    };
}

const initialState: InitialStateType = {
    products: [],
    page: {
        itemsPerPage: 1,
        totalPage: 1,
        totalItems: 1,
    },
};
const productAdminSlice = createSlice({
    name: "productAdmin",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProductAdmin.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.page = action.payload.page;
        });
        builder.addCase(postProductAdmin.fulfilled, (state, action) => {
            console.log(123);
        });
    },
});

const productAdminReducer = productAdminSlice.reducer;

export default productAdminReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    ProductDetailResponseType,
    ProductResponseType,
    ProductType,
    ProductTypeDetaill,
} from "../../types/product.type";
import http from "../../utils/http";
import { path } from "../../helpers/path.helper";
import { SuccessType } from "../../types/success.type";

export const getProductAdmin = createAsyncThunk("product/get", async (page: number = 1, _thunkAPI) => {
    const products = await http.instance.get<ProductResponseType>(`${path.api.product}?page=${page}`);
    return products.data.data;
});
export const postProductAdmin = createAsyncThunk("product/add", async (data: FormData, _thunkAPI) => {
    http.contentType = false;
    const product = await http.instance.post<ProductDetailResponseType>(`${path.api.product}`, data);
    return product.data.data;
});
export const getProductDetailAdmin = createAsyncThunk("product/detail", async (id: string, _thunkAPI) => {
    const product = await http.instance.get<ProductDetailResponseType>(`${path.api.product}/${id}`);
    return product.data.data;
});

export const editProductAdmin = createAsyncThunk(
    "product/edit",
    async ({ id, data }: { data: FormData; id: string }, _thunkAPI) => {
        http.contentType = false;
        const product = await http.instance.patch<ProductDetailResponseType>(`${path.api.product}/${id}`, data);
        return product.data.data;
    }
);
export const deleteProductAdmin = createAsyncThunk("product/delete", async (id: string, _thunkAPI) => {
    http.contentType = false;
    const product = await http.instance.patch<SuccessType>(`${path.api.product}/delete/${id}`);
    return {
        ...product,
        id,
    };
});

interface InitialStateType {
    products: ProductType[];
    productDetail: ProductTypeDetaill;
    page: {
        itemsPerPage: number;
        totalPage: number;
        totalItems: number;
    };
    isLoading: boolean;
}

const initialState: InitialStateType = {
    products: [],
    page: {
        itemsPerPage: 1,
        totalPage: 1,
        totalItems: 1,
    },
    productDetail: {
        _id: "",
        productShop: {
            _id: "",
            address: "",
            fullName: "",
        },
        productBrand: "",
        productName: "",
        productType: "",
        productThumbnail: "",
        productMultipleThumbnail: [],
        productQuantity: "",
        productPrice: "",
        ratingsAverage: "",
        productDescription: "",
        productAttribute: {
            _id: "",
            manufacture: "",
            size: [],
            material: "",
            special: [],
            color: [],
        },
    },
    isLoading: false,
};
const productAdminSlice = createSlice({
    name: "productAdmin",
    initialState,
    reducers: {
        startFetching(state) {
            state.isLoading = true;
        },
        endFetching(state) {
            state.isLoading = false;
        },
    },
    extraReducers(builder) {
        builder.addCase(getProductAdmin.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.page = action.payload.page;
        });
        builder.addCase(getProductDetailAdmin.fulfilled, (state, action) => {
            state.productDetail = action.payload;
            state.isLoading = false;
        });
        builder.addCase(editProductAdmin.fulfilled, (state, action) => {
            const payload = action.payload;
            const foundProduct = state.products.findIndex((val) => val._id === payload._id);
            if (foundProduct === -1) return;
            state.products[foundProduct] = payload;
            state.isLoading = false;
        });
        builder.addCase(deleteProductAdmin.fulfilled, (state, action) => {
            state.products = state.products.filter((val) => val._id !== action.payload.id);
            state.isLoading = false;
        });
    },
});

const productAdminReducer = productAdminSlice.reducer;
export const { endFetching, startFetching } = productAdminSlice.actions;

export default productAdminReducer;

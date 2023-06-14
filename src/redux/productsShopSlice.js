import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const productShopSlice = createSlice({
   name: "productShopSlice",
   initialState: {
      productsTable: {
         data: [],
         page: 1,
         isLoading: true,
         totalPages: 0,
      },
   },
   reducers: {},
   extraReducers: (builder) =>
      builder
         .addCase(getProductTableAndPaging.fulfilled, (state, action) => {
            state.productsTable.data = action.payload.lists;
            state.productsTable.page = action.payload.pageNumber;
            state.productsTable.isLoading = false;
         })

         .addCase(getProductTableAndPaging.pending, (state, action) => {
            state.productsTable.isLoading = true;
         }),
});

export default productShopSlice;

export const getProductTableAndPaging = createAsyncThunk(
   "productShop/getProductTableAndPaging",
   async (page) => {
      console.log(page);
      try {
         const res = await api.get("/shop-owner/products/" + page);
         const data = res.data;
         console.log(data);
         return data;
      } catch (err) {
         console.log(err);
      }
   }
);

export const productTableSelector = (state) =>
   state.productShopSlice.productsTable;

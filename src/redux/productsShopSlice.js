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
         filter: {
            
         }
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
         })
         .addCase(getProductTableAndPaging.rejected, (state, action) => {
            console.log('errrrroorrrrrrrrrrrrrrrrrr')
         }),
});

export default productShopSlice;

export const getProductTableAndPaging = createAsyncThunk(
   "productShop/getProductTableAndPaging",
   async (payload ) => {
      try {
         const res = await api.get(`shop-owner/${payload.type}/pages/${payload.page}`);
         const data = res.data;
         console.log(data);
         return data;
      } catch (err) {
         console.log(err);
         throw err;
      }
   }
);

export const productTableSelector = (state) =>
   state.productShopSlice.productsTable;

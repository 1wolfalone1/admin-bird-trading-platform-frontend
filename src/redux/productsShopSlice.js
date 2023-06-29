import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { category } from "../config/constant";

const productShopSlice = createSlice({
   name: "productShopSlice",
   initialState: {
      productsTable: {
         data: [],
         pageNumber: 0,
         isLoading: true,
         type: category.BIRDS,
         totalProduct: 0,
         filter: {},
      },
   },
   reducers: {
      changeTab: (state, action) => {
         state.productsTable.type = action.payload;
      }
   },
   extraReducers: (builder) =>
      builder
         .addCase(getProductTableAndPaging.fulfilled, (state, action) => {
            state.productsTable.data = action.payload.lists;
            state.productsTable.pageNumber = action.payload.pageNumber;
            state.productsTable.totalProduct = action.payload.totalProduct;
            state.productsTable.isLoading = false;
         })

         .addCase(getProductTableAndPaging.pending, (state, action) => {
            state.productsTable.isLoading = true;
         })
         .addCase(getProductTableAndPaging.rejected, (state, action) => {
            console.log("errrrroorrrrrrrrrrrrrrrrrr");
         }),
});

export default productShopSlice;

export const getProductTableAndPaging = createAsyncThunk(
   "productShop/getProductTableAndPaging",
   async (page, {getState}) => {
      const state = getState();
      try {
         const typeName = state.productShopSlice.productsTable.type.url;
        console.log(typeName);
         const res = await api.get(
            `shop-owner/${typeName}/pages/${page}`
         );
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

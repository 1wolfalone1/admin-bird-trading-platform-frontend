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
         listSelected: [],
         rowModesModel: {},
         mode: 'view',
         currentPage: 1
      },
   },
   reducers: {
      changeTab: (state, action) => {
         state.productsTable.type = action.payload;
      },
      changeListSelectedRows: (state, action) => {
         state.productsTable.listSelected = action.payload
      },
      changeRowsModeModel: (state, action) => {
         state.productsTable.rowModesModel = action.payload;
      },
      changeTableMode: (state, action) => {
         state.productsTable.mode = action.payload;
      }
   },
   extraReducers: (builder) =>
      builder
         .addCase(getProductTableAndPaging.fulfilled, (state, action) => {
            const {data, page } = action.payload;
            state.productsTable.data = data.lists;
            state.productsTable.pageNumber = data.pageNumber;
            state.productsTable.totalProduct = data.totalProduct;
            state.productsTable.isLoading = false;
            state.productsTable.currentPage = page;

            
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
   async (page, { getState }) => {
      const state = getState();
      try {
         const typeName = state.productShopSlice.productsTable.type.url;
         const res = await api.get(`shop-owner/${typeName}/pages/${page}`);
         const data = res.data;
         return {
            data: data,
            page: page
         };
      } catch (err) {
         console.log(err);
         throw err;
      }
   }
);

export const productTableSelector = (state) =>
   state.productShopSlice.productsTable;

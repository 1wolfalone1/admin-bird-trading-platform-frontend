import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

const shopOrderSlice = createSlice({
   name: "shopOrderSlice",
   initialState: {
      shopOrderTable: {
         data: [],
         isLoading: true,
         totalOrders: 0,
         listSelected: [],
         rowModesModel: {},
         mode: "view",
         currentPage: 1,
      },
      tab: 1,
   },
   reducers: {
      changeTab: (state, action) => {
         state.tab = action.payload;
      },
   },
   extraReducers: (builder) =>
      builder
         .addCase(getOrderFilterPaging.fulfilled, (state, action) => {
            const { pageNumber, totalElement, lists } = action.payload.data;
            const page = action.payload.page;
            console.log(JSON.stringify(lists));
            state.shopOrderTable.data = lists;
            state.shopOrderTable.totalOrders = totalElement;
            state.shopOrderTable.isLoading = false;
            state.shopOrderTable.currentPage = page;
         })
         .addCase(getOrderFilterPaging.pending, (state, action) => {
            state.shopOrderTable.isLoading = true;
         })
         .addCase(getOrderFilterPaging.rejected, (state, action) => {
            state.shopOrderTable.isLoading = false;
            state.shopOrderTable.data = [];
            state.shopOrderTable.totalOrders = 0;
            state.shopOrderTable.totalItems = 0;

            state.shopOrderTable.currentPage = 0;
         }),
});

export default shopOrderSlice;

export const getOrderFilterPaging = createAsyncThunk(
   "shopOrderSlice/getorderfilterpag",
   async (page) => {
      console.log(page, "page");
      try {
         const res = await api.get("shop-owner/orders?pageNumber=" + page);
         const data = await res.data;
         console.log(data);
         return {
            data: data,
            page: page,
         };
      } catch (err) {
         console.log(err);
         throw err;
      }
   }
);

export const getShopOrderTableSelector = (state) => state.shopOrderSlice.shopOrderTable;

export const getShopOrderSelector = (state) => state.shopOrderSlice;

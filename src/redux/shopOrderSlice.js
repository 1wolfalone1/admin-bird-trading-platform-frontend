import { createSlice } from "@reduxjs/toolkit";

const shopOrderSlice = createSlice({
   name: "orderShopSlice",
   initialState: {
      tab: 1,
   },
   reducers: {
      changeTab: (state, action) => {
         state.tab = action.payload;
      }
   },
});

export default shopOrderSlice;

export const getShopOrderSelector = (state) => state.shopOrderSlice;

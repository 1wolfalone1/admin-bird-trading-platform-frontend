import { createSlice } from "@reduxjs/toolkit";

const shopStaffSlice = createSlice({
   name: "shopStaffSlice",
   initialState: {
      tab: 1,
   },
   reducers: {
      changeTab: (state, action) => {
         state.tab = action.payload;
      }
   },
});

export default shopStaffSlice;

export const getShopStaffSelector = (state) => state.shopStaffSlice;

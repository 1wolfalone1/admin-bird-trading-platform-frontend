import { createSlice } from "@reduxjs/toolkit";
import { userRole } from "../config/constant";





const globalConfigSlice = createSlice({
   name: 'globalConfigSlice',
   initialState: {
      openBackDrop: false,
   },
   reducers :{
      changeBackDropState: (state, action) => {
         state.openBackDrop = action.payload;
      }
   }
})

export default globalConfigSlice;


export const globalSliceSelector = state => state.globalConfigSlice;
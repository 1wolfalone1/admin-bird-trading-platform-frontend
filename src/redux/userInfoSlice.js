import { createSlice } from "@reduxjs/toolkit";
import { userRole } from "../config/constant";

const userInfoSlice = createSlice({
   name: 'userInfoSlice',
   initialState: {
      info: {

      }, 
      role: 0,
   },
   reducers :{
      changeUserInfo: (state, actions) => {
         return actions.payload;
      }
   }
})

export default userInfoSlice;


export const userInfoSliceSelector = state => state.userInfoSlice;

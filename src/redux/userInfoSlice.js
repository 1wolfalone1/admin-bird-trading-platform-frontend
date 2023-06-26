import { createSlice } from "@reduxjs/toolkit";





const userInfoSlice = createSlice({
   name: 'userInfoSlice',
   initialState: {
      userInfor: '',
   },
   reducers :{

   }
})

export default userInfoSlice;

export const userInfoSelector = (state) =>  state.userInfoSlice.userInfor;
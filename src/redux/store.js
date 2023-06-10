import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import sideBarSlice from "./sideBarSlice";



const store = configureStore({
   reducer: {
      userInfoSlice: userInfoSlice.reducer,
      sideBarSlice: sideBarSlice.reducer,
   }
})
export default store;
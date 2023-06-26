import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoSlice";
import sideBarSlice from "./sideBarSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import productShopSlice from "./productsShopSlice";
import productDetailsSlice from "./productDetailsSlice";
import fileControlSlice from "./fileControlSlice";
import productDetailsValidateSlice from "./productDetailsValidateSlice";
import messageSlice from './messageSlice';

const persistConfig = {
   key: "root",
   version: 1,
   storage,
   // if you do not want to persist this part of the state
   blacklist: [
      "sideBarSlice",
      "productShopSlice",
      "fileControlSlice",
      "productDetailsValidateSlice",
      'productDetailsSlice'
   ],
};
const reducer = combineReducers({
   userInfoSlice: userInfoSlice.reducer,
   // not persisting this reducer
   sideBarSlice: sideBarSlice.reducer,
   productShopSlice: productShopSlice.reducer,
   productDetailsSlice: productDetailsSlice.reducer,
   fileControlSlice: fileControlSlice.reducer,
   productDetailsValidateSlice: productDetailsValidateSlice.reducer,
   messageSlice: messageSlice.reducer,
});
// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
export default store;

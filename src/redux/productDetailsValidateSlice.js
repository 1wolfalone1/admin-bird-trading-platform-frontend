import {
   createAsyncThunk,
   createSelector,
   createSlice,
   current,
} from "@reduxjs/toolkit";
import { api } from "../api/api";
import { getListImagesPreviewSelector } from "./fileControlSlice";

const productDetailsValidateSlice = createSlice({
   name: "productDetailsValidateSlice",
   initialState: {
      basicForm: {
         form: null,
         data: {
            name: "",
            category: 0,
         },
      },
      detailsForm: {
         form: null,
         data: {
            type: 0,
            tag: [],
            description: "",
         },
      },
      feature: {
         form: null,
         data: {},
      },
      salesForm: {
         form: null,
         data: {
            price: 0,
            quantity: 0,
            voucher: [],
         },
      },
      getForm: false,
      imageState: {
         status: true,
         msg: "Need images to create products!",
      },
      errorForm : {
         basic: 0,
         details: 0,
         sales: 0
      }
   },

   reducers: {
      handleOnChangeBasicForm: (state, action) => {
         state.basicForm.data = action.payload;
      },
      handleOnChangeDetailsForm: (state, action) => {
         state.detailsForm.data = action.payload;
      },
      handleOnChangeSalesForm: (state, action) => {
         state.salesForm.data = action.payload;
      },
      changeValidState: (state, action) => {
         state.isValid = action.payload;
      },
      handleOnChangeFeature: (state, action) => {
         state.feature.data = action.payload;
      },
      setBasicForm: (state, action) => {
         state.basicForm.form = action.payload;
      },
      setDetailsForm: (state, action) => {
         state.detailsForm.form = action.payload;
      },
      setSalesForm: (state, action) => {
         state.salesForm.form = action.payload;
      },
      setFeatureCategory: (state, action) => {
         state.feature.form = action.payload;
      },
      getForm: (state, action) => {
         state.getForm = !state.getForm;
      },
      setImagesState: (state, action) => {
         state.imageState.status = action.payload;
      },
      changeErrorFormBasic: (state, action) => {
         state.errorForm.basic = action.payload;
      },
      changeErrorFormDetails: (state, action) => {
         state.errorForm.details = action.payload;

      },
      changeErrorFormSales: (state, action) => {
         state.errorForm.sales = action.payload;
      },

   },
   // extraReducers: (builder) =>
   //    builder
   //       .addCase(getProductTableAndPaging.fulfilled, (state, action) => {
   //          state.productsTable.data = action.payload.lists;
   //          state.productsTable.page = action.payload.pageNumber;
   //          state.productsTable.isLoading = false;
   //       })
});

export default productDetailsValidateSlice;

export const getCategoryInForm = (state) =>
   state.productDetailsValidateSlice.basicForm.data.category;

export const getProductValidateStateSelector = (state) =>
   state.productDetailsValidateSlice;

export const getBasicFormSelector = (state) =>
   state.productDetailsValidateSlice.basicForm.form;
export const getDetailFormSelector = (state) =>
   state.productDetailsValidateSlice.detailsForm.form;
export const getFeatureSelector = (state) =>
   state.productDetailsValidateSlice.feature.form;
export const getSalesFormSelector = (state) =>
   state.productDetailsValidateSlice.salesForm.form;

export const getFormSelector = (state) =>
   state.productDetailsValidateSlice.getForm;

export const getImageStateSelector = (state) =>
   state.productDetailsValidateSlice.imageState;

export const getErrorFormSelector = (state) => state.productDetailsValidateSlice.errorForm

export const getIsImageValidateSelector = createSelector(
   getListImagesPreviewSelector,
   (images) => {
      console.log(images);
      if(images && images.length === 0) {
         return false;
      } else {
         return true;
      }
   }
);

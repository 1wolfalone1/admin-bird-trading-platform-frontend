import { createSlice, current } from "@reduxjs/toolkit";

const fileControlSlice = createSlice({
   name: "fileControlSlice",
   initialState: {
      listImagesPreview: [],
      currentEdit: {},
      isOpenEdit: false,
      videoPreview: "",
      videoBlob: "",
      isVideoOpenEdit: false,
      errorMessage: ""
   },
   reducers: {
      openVideoEditor: (state, action) => {
         state.isVideoOpenEdit = action.payload;
      },
      addVideoPreview: (state, action) => {
         state.videoPreview = action.payload;
      },
      addImagesPreview: (state, action) => {
         console.log(action.payload);
         state.listImagesPreview?.push(action.payload);
      },
      openEditor: (state, action) => {
         state.isOpenEdit = action.payload;
      },
      changeCurrentEdit: (state, action) => {
         console.log(action.payload);
         state.currentEdit = action.payload;
      },
      cropImage: (state, action) => {
         state.listImagesPreview.map((image) => {
            if (image.id === action.payload.id) {
               image.src = action.payload.src;
               image.file = action.payload.file;
               return image;
            } else {
               return image;
            }
         });
      },
      removeImage: (state, action) => {
         console.log(action.payload);
         state.listImagesPreview = state.listImagesPreview.filter(
            (image) => image.id !== action.payload.id
         );
      },
      setErrorMessage: (state, action) => {
         state.errorMessage = action.payload
      },
      removeVideoPreview: (state, action) => {
         state.videoPreview = '';
         console.log(current(state))
      },
      setVideoBlob: (state, action) => {
         state.videoBlob = action.payload
      }
   },
   // extraReducers: (builder) =>
   //    builder
   //       .addCase(getProductTableAndPaging.fulfilled, (state, action) => {
   //          state.productsTable.data = action.payload.lists;
   //          state.productsTable.page = action.payload.pageNumber;
   //          state.productsTable.isLoading = false;
   //       })
});

export default fileControlSlice;

export const getListImagesPreviewSelector = (state) =>
   state.fileControlSlice.listImagesPreview;
export const getOpenEditSelector = (state) => state.fileControlSlice.isOpenEdit;
export const getCurrentEditSelector = (state) =>
   state.fileControlSlice.currentEdit;
export const getVideoPreviewSelector = (state) =>
   state.fileControlSlice.videoPreview;
export const getIdVideoEditorSelector = state => state.fileControlSlice.isVideoOpenEdit;

export const getErrorMessageSelector = state => state.fileControlSlice.errorMessage;
export const getVideoBlobSelector = state => state.fileControlSlice.videoBlob;
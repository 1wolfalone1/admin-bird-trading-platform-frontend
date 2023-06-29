import React, { useEffect } from "react";
import { breadCrumbs } from "../../config/constant";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import s from "./updateProductPage.module.scss";
import UpdateProductsStepper from "../../component/update-product-stepper/UpdateProductsStepper";
import FormUpdateProduct from "../../component/form-update-product/FormUpdateProduct";
import { useDispatch, useSelector } from "react-redux";
import productDetailsValidateSlice, {
   getBasicForm,
   getBasicFormSelector,
   getDetailFormSelector,
   getFeatureSelector,
   getFormSelector,
   getSalesFormSelector,
} from "../../redux/productDetailsValidateSlice";
import {
   getListImagesPreviewSelector,
   getVideoBlobSelector,
} from "../../redux/fileControlSlice";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Button } from "@mui/material";
import { objectToBlob } from "../../utils/myUtils";
import axios from "axios";
import { api } from "../../api/api";
let breadCrumbPath = [breadCrumbs.PRODUCTS, breadCrumbs.CREATE_PRODUCTS];

export default function UpdateProductPage() {
   useBreadCrumb(breadCrumbPath);
   const listImages = useSelector(getListImagesPreviewSelector);
   const video = useSelector(getVideoBlobSelector);
   const basicForm = useSelector(getBasicFormSelector);
   const detailsForm = useSelector(getDetailFormSelector);
   const feature = useSelector(getFeatureSelector);
   const salesForm = useSelector(getSalesFormSelector);
   const [getForm, setGetForm] = useState(0);

   const dispatch = useDispatch();
   const handleSubmit = async () => {
      await dispatch(productDetailsValidateSlice.actions.getForm());

      setGetForm((state) => state + 1);
   };

   useEffect(() => {
      if (getForm !== 0) {
         handleSubmitAfterGetForm();
      }
   }, [getForm]);
   function setAllValuesToTrue(obj) {
      return Object.keys(obj).reduce((acc, key) => {
         acc[key] = true;
         return acc;
      }, {});
   }
   const handleSubmitAfterGetForm = async () => {
      await basicForm?.setTouched(setAllValuesToTrue(basicForm.values));
      await basicForm?.validateForm(basicForm.values);

      await detailsForm?.setTouched(setAllValuesToTrue(detailsForm.values));
      await detailsForm?.validateForm(detailsForm.values);
      console.log(feature, '2313123123213');
      await feature?.setTouched(setAllValuesToTrue(feature.values));
      await feature?.validateForm(feature.values);

      await salesForm?.setTouched(setAllValuesToTrue(salesForm.values));
      await salesForm?.validateForm(salesForm.values);

      console.log(basicForm?.isValid, "1");
      console.log(detailsForm?.isValid, 2);
      console.log(feature?.isValid, 3);
      console.log(salesForm?.isValid, 4);
      const formData = new FormData();
      let count = 0;
      let productData = {};
      if (listImages !== undefined && listImages.length > 0) {
         console.log(listImages, "listtttttttt");
         listImages.forEach((image) => {
            console.log(image, "listttttttimageaegasgeagseag");
            formData.append("image", image.file);
         });
         dispatch(productDetailsValidateSlice.actions.setImagesState(true));
         dispatch(productDetailsValidateSlice.actions.changeErrorFormBasic(1));
      } else {
         count++;
         dispatch(productDetailsValidateSlice.actions.setImagesState(false));
         dispatch(productDetailsValidateSlice.actions.changeErrorFormBasic(-1));
      }
      if (video !== null && video !== "") {
         console.log(video, "?????????????????????????????");
         formData.append("video", video);
      }

      if (basicForm?.isValid) {
         productData = {
            ...productData,
            categoryId: basicForm.values.category,
            name: basicForm.values.name,
         };
         if (count === 0) {
            dispatch(
               productDetailsValidateSlice.actions.changeErrorFormBasic(1)
            );
         }
      } else {
         count++;
         dispatch(productDetailsValidateSlice.actions.changeErrorFormBasic(-1));
      }
      let count2 = 0;
      if (detailsForm?.isValid) {
         const listTagId = detailsForm.values.tag.map((tag) => tag.id);
         productData = {
            ...productData,
            tagId: listTagId,
            typeId: detailsForm.values.type,
            description: detailsForm.values.description,
         };
         dispatch(
            productDetailsValidateSlice.actions.changeErrorFormDetails(1)
         );
      } else {
         count++;
         count2++;
         dispatch(
            productDetailsValidateSlice.actions.changeErrorFormDetails(-1)
         );
      }

      if (feature?.isValid) {
         productData = { ...productData, feature: feature.values };
         if (count2 === 0)
            dispatch(
               productDetailsValidateSlice.actions.changeErrorFormDetails(1)
            );
      } else {
         count++;

         dispatch(
            productDetailsValidateSlice.actions.changeErrorFormDetails(-1)
         );
      }
      if (salesForm?.isValid) {
         productData = {
            ...productData,
            price: salesForm.values.price,
            quantity: salesForm.values.quantity,
            promotionShopId: salesForm.values.voucher,
         };
         dispatch(productDetailsValidateSlice.actions.changeErrorFormSales(1));
      } else {
         count++;
         dispatch(productDetailsValidateSlice.actions.changeErrorFormSales(-1));
      }
      formData.append("data", objectToBlob(productData));
      console.log(JSON.stringify(productData), count);
      if (count === 0) {
         console.log(formData.getAll("image"));
         console.log(formData.getAll("video"));
         console.log(formData.getAll("data"));
         handleCreateProduct(formData);
      }
   };
   const handleCreateProduct = async (formData) => {
      console.log(formData.getAll("image"));
      console.log(formData.getAll("video"));
      console.log(formData.getAll("data"));
      try {
         const res = await api.post("/shop-owner/products", formData, {
            headers: {
               "Content-type": "multipart/form-data",
            },
         });
         const data = await res.data;
         console.log(data);
      } catch (e) {
         console.log(e);
      }
   };
   return (
      <div className={s.container}>
         <Grid2 container spacing={4}>
            <Grid2 xs={3}>
               <UpdateProductsStepper />
            </Grid2>
            <Grid2 xs={9}>
               <FormUpdateProduct />
            </Grid2>
         </Grid2>
         <div className={s.control}>
            <Button
               variant="outlined"
               color="template7"
               sx={{ fontSize: "2.4rem", width: "12rem" }}
            >
               Cancel
            </Button>
            <Button
               variant="outlined"
               color="template8"
               sx={{ fontSize: "2.4rem", width: "12rem" }}
               onClick={handleSubmit}
            >
               Save
            </Button>
         </div>
      </div>
   );
}

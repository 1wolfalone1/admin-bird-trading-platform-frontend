import clsx from "clsx";
import s from "./formUpdateProduct.module.scss";
import React, { useEffect, useRef } from "react";
import FormBasicInfo from "./form-basic-info/FormBasicInfo";
import FormDetailsInfo from "./form-details-info/FormDetailsInfo";
import FormSalesInfo from "./form-sales-info/FormSalesInfo";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import productDetailsSlice from "../../redux/productDetailsSlice";
export const styleFormUpdate = {
   textField: {
      width: "90%",
      input: {
         padding: "1rem",
      },
   },
   select: {
      padding: "0",
      width: "24rem",
      height: "5rem",
   },
};

export default function FormUpdateProduct() {
   const dispatch = useDispatch();
   const basicFormRef = useRef()
   const detailsFormRef = useRef()
   const salesFormRef = useRef()
   useEffect(() => {
      dispatch(productDetailsSlice.actions.changeFormRef({
            basicRef: basicFormRef,
            detailsRef: detailsFormRef,
            salesRef: salesFormRef,
      }))
   }, []);
   return (
      <div className={clsx(s.container)}>
         <div ref={basicFormRef} className={clsx(s.form, "box-shadow")}>
            <FormBasicInfo />
         </div>
         <div ref={detailsFormRef} className={clsx(s.form, "box-shadow")}>
            <FormDetailsInfo />
         </div>
         <div ref={salesFormRef} className={clsx(s.form, "box-shadow")}>
            <FormSalesInfo />
         </div>
         
      </div>
   );
}

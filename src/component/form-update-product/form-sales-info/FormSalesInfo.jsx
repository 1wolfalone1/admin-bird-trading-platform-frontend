import s from "./formSalesInfo.module.scss";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import productDetailsValidateSlice, {
   getCategoryInForm, getFormSelector,
} from "../../../redux/productDetailsValidateSlice";
import FieldCustom from "../field-custom/FieldCustom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
   Autocomplete,
   Checkbox,
   InputAdornment,
   TextField,
} from "@mui/material";
import { styleFormUpdate } from "../FormUpdateProduct";
import { getListVoucherSelector } from "../../../redux/productDetailsSlice";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
   price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
   quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .positive("Quantity must be a positive number")
      .required("Quantity is required"),
});
export default function FormSalesInfo() {
   const category = useSelector(getCategoryInForm);
   const listVouchers = useSelector(getListVoucherSelector);
   const dispatch = useDispatch();
   const getForm = useSelector(getFormSelector);
   const getCategoryName = (category) => {
      if (category === 1) {
         return "bird";
      }
      if (category === 2) {
         return "food";
      }
      if (category === 3) {
         return "accessory";
      }
   };
   const form = useFormik({
      initialValues: {
         price: 0,
         quantity: 0,
         voucher: [],
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      validationOnMount: true
   });
   useEffect(() => {
      dispatch(
         productDetailsValidateSlice.actions.handleOnChangeSalesForm(
            form.values
         )
      );
      form.validateForm(form.values)
      dispatch(productDetailsValidateSlice.actions.setSalesForm(form));
   }, [getForm]);

   return (
      <form className={s.container}>
         <h2>Sales information</h2>
         {category === 0 ? (
            <>
               <span style={{ fontSize: "2rem", color: "#3b3b3b" }}>
                  After selecting a category, you will be able to proceed
                  further.
               </span>
            </>
         ) : (
            <>
               <FieldCustom
                  title={"Price of " + getCategoryName(category)}
                  isRequired
               >
                  <TextField
                     value={form.values.price}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={form.touched.price && Boolean(form.errors.price)}
                     helperText={form.touched.price && form.errors.price}
                     id="price"
                     sx={styleFormUpdate.textField}
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">$</InputAdornment>
                        ),
                     }}
                  />
               </FieldCustom>
               <FieldCustom
                  title={"Quantity of " + getCategoryName(category)}
                  isRequired
               >
                  <TextField
                     value={form.values.quantity}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={
                        form.touched.quantity && Boolean(form.errors.quantity)
                     }
                     helperText={form.touched.quantity && form.errors.quantity}
                     id="quantity"
                     sx={styleFormUpdate.textField}
                  />
               </FieldCustom>
               <FieldCustom title={"Voucher of " + getCategoryName(category)}>
                  {listVouchers !== undefined && listVouchers.length !== 0 && (
                     <>
                        <Autocomplete
                           id="tag"
                           multiple
                           value={form.values.voucher}
                           onBlur={form.handleBlur("voucher")}
                           onChange={(event, value) =>
                              form.setFieldValue("voucher", value)
                           }
                           disableCloseOnSelect
                           renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                 <Checkbox sx={{ mr: 1 }} checked={selected} />
                                 {option.name}
                              </li>
                           )}
                           sx={{ width: "90%" }}
                           renderInput={(params) => (
                              <TextField
                                 {...params}
                                 label="Select tags"
                                 variant="outlined"
                              />
                           )}
                           options={listVouchers}
                           getOptionLabel={(option) => option.name}
                           filterOptions={(options, state) =>
                              options.filter((option) =>
                                 option.name
                                    .toLowerCase()
                                    .includes(state.inputValue.toLowerCase())
                              )
                           }
                        />
                     </>
                  )}
               </FieldCustom>
            </>
         )}
      </form>
   );
}
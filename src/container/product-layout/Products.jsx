import { breadCrumbs } from "../../config/constant";
import s from "./products.module.scss";
import React, { useEffect } from "react";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";

import ProductsDataGridShop from "../../component/data-grid/products-data-grid-shop/ProductsDataGridShop";
import {
   Button,
   FormControl,
   FormControlLabel,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
} from "@mui/material";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import sideBarSlice, { typeMenu } from "../../redux/sideBarSlice";
import { useNavigate } from "react-router-dom";
const breadCrumbPath = [breadCrumbs.PRODUCTS];
const MenuProps = {
   disableScrollLock: true,
   PaperProps: {
      style: {
         maxHeight: "19rem",
         color: "red",
         fontSize: "3rem",
      },
   },
};

const selectStyle = {
   fontSize: "1.6rem",
};

export default function Products() {
   const navigate = useNavigate();
   useBreadCrumb(breadCrumbPath);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(sideBarSlice.actions.changeCurrentActive(typeMenu.PRODUCTS.id));
   }, []);
   return (
      <div className={s.container}>
         <div className={s.headerTable}>
            <h2>Product mananger</h2>
            <div className={clsx(s.controller, "box-shadow")}>
               <div className={s.right}></div>
               <div className={s.left}>
                  <FormControl color="primary" fullWidth>
                     <InputLabel
                        id="demo-multiple-checkbox-label"
                        sx={{ fontSize: "1.6rem" }}
                     >
                        Categories
                     </InputLabel>
                     <Select
                        input={<OutlinedInput label="Categories" />}
                        renderValue={(selected) => {
                           const renderValue = selected.join(", ");
                           return renderValue;
                        }}
                        MenuProps={MenuProps}
                        fullWidth={true}
                        sx={selectStyle}
                     >
                        <MenuItem>dsfasf</MenuItem>
                     </Select>
                  </FormControl>
                  <Button
                     variant="outlined"
                     sx={{ width: "200px", height: "50px" }}
                     onClick={() => navigate(breadCrumbs.CREATE_PRODUCTS.url)}
                  >
                     <span>Create products +</span>
                  </Button>
               </div>
            </div>
         </div>
         <div style={{ height: "60rem", width: "100%" }}>
            <ProductsDataGridShop />
         </div>
      </div>
   );
}

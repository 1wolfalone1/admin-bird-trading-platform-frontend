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
import ProductShopPageController from "../../component/products-shop-page-controller/ProductShopPageController";
const breadCrumbPath = [breadCrumbs.PRODUCTS];


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
            <ProductShopPageController/>
         </div>
         <div style={{ height: "60rem", width: "100%" }}>
            <ProductsDataGridShop />
         </div>
      </div>
   );
}

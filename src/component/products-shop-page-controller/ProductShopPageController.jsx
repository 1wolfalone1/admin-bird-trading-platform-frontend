import clsx from "clsx";
import s from "./productShopPageController.module.scss";
import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import CustomSelect from "../select-custom/CustomSelect";
import { useNavigate } from "react-router-dom";
import { CATEGORY, breadCrumbs, category } from "../../config/constant";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import productShopSlice, {
   getProductTableAndPaging,
   productTableSelector,
} from "../../redux/productsShopSlice";

export default function ProductShopPageController() {
   const { type } = useSelector(productTableSelector);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleTabValueChange = (e, value) => {
      const cate = Object.values(category).find((cate) => cate.id === value);
      dispatch(productShopSlice.actions.changeTab(cate));
   };
   useEffect(() => {
      let active = true;
      if (active) {
         dispatch(getProductTableAndPaging(1));
      }
      return () => {
         active = false;
      };
   }, [type]);
   return (
      <div className={clsx(s.controller, "box-shadow")}>
         <Grid2 container width={"100%"}>
            <Grid2 xs={6} className={s.right}>
               <Tabs
                  value={type.id}
                  onChange={handleTabValueChange}
                  aria-label="basic tabs example"
               >
                  {CATEGORY.map((cate) => (
                     <Tab label={cate.name} key={cate.id} value={cate.id} />
                  ))}
               </Tabs>
            </Grid2>
            <Grid2 xs={6} className={clsx(s.left)}>
               <CustomSelect />
               <Button
                  variant="outlined"
                  sx={{ fontSize: "1.2rem", height: "100%", width: "30rem" }}
                  onClick={() => navigate(breadCrumbs.CREATE_PRODUCTS.url)}
               >
                  <span>Create products +</span>
               </Button>
            </Grid2>
         </Grid2>
      </div>
   );
}

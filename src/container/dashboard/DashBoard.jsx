import { useDispatch } from "react-redux";
import MenuItem, { typeMenu } from "../../component/menu-item/MenuItem";
import { breadCrumbs } from "../../config/constant";
import s from "./dashBoard.module.scss";
import React, { useEffect } from "react";
import sideBarSlice from "../../redux/sideBarSlice";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createFakeServer, useDemoData } from "@mui/x-data-grid-generator";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";
import { Select } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import SummaryTotalShop from "../../component/summary-total-shop/SummaryTotalShop";
import StaticsTrendingProducts from "../../component/statics-trending-products-shop/StaticsTrendingProducts";
import StaticsPriceByCategory from "../../component/statics-price-category-pie-chart-shop/StaticsPriceByCategory";

const breadCrumbPath = [
   breadCrumbs.DASH_BOARD,
   breadCrumbs.FOOD,
   breadCrumbs.BIRDS,
   breadCrumbs.SUMMARY_ORDERS,
];

export default function DashBoard() {
   useBreadCrumb(breadCrumbPath);
   return (
      <div className={s.container}>
         <div className={s.summaryTotal}>
            <Grid2 container padding={0} spacing={"3rem"}>
               <Grid2 xs={4}>
                  <SummaryTotalShop />
               </Grid2>
               <Grid2 xs={4}>
                  <SummaryTotalShop />
               </Grid2>
               <Grid2 xs={4}>
                  <SummaryTotalShop />
               </Grid2>
            </Grid2>
         </div>
         <div className={s.chart}>
            <Grid2 container spacing={"3rem"} fullWidth>
               <Grid2 xs={7} >
                  <StaticsTrendingProducts />
               </Grid2>
               <Grid2 xs={5}>
                  <StaticsPriceByCategory />
               </Grid2>
            </Grid2>
         </div>
      </div>
   );
}

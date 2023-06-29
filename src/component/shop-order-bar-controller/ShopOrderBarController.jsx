import { useTheme } from "@emotion/react";
import { Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import shopOrderSlice, {
   getShopOrderSelector,
} from "../../redux/shopOrderSlice";
import { useNavigate } from "react-router-dom";

export default function ShopOrderBarController() {
   const theme = useTheme();
   const { tab } = useSelector(getShopOrderSelector);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   return (
      <Grid2
         container
         className={clsx("box-shadow")}
         sx={{
            backgroundColor: theme.palette.template5.main,
            height: "6.4rem",
            width: "100%",
            borderRadius: "0.8rem",
            padding: "0.8rem 1rem",
         }}
      >
         <Grid2 xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Tabs
               value={tab}
               aria-label="basic tabs example"
            >
               <Tab
                  label={"Order"}
                  value={1}
                  onClick={() => navigate("/order")}
               />
               <Tab
                  label={"Order details"}
                  value={2}
                  onClick={() => navigate("/order/order-details")}
               />
            </Tabs>
         </Grid2>
         <Grid2 xs={6}></Grid2>
      </Grid2>
   );
}

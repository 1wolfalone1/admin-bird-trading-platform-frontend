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
import { getShopStaffSelector } from "../../redux/shopStaffSlice";

export default function ShopStaffBarController() {
   const theme = useTheme();
   const { tab } = useSelector(getShopStaffSelector);
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
            <Tabs value={tab} aria-label="basic tabs example">
               <Tab
                  label={"Staffs"}
                  value={1}
                  onClick={() => navigate("/staff")}
               />
               <Tab
                  label={"Create staff"}
                  value={2}
                  onClick={() => navigate("/staff/create-staff")}
               />
            </Tabs>
         </Grid2>
         <Grid2 xs={6}></Grid2>
      </Grid2>
   );
}

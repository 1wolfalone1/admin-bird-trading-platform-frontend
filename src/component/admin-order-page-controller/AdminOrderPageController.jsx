import { Box, Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import theme from "../../style/theme";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import adminPackageSlice, {
   getAdminPackageSelector,
} from "../../redux/adminPackageSlice";
import { useNavigate } from "react-router-dom";

export default function AdminOrderPageController() {
   const { tab } = useSelector(getAdminPackageSelector);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleChangeTab = (e, value) => {
      console.log(value, e.target);
      dispatch(adminPackageSlice.actions.changeTab(value));
      if (value == 1) {
         navigate("/admin/package-order");
      } else if (value == 2) {
         navigate("/admin/package-order/order");
      }
   };
   console.log(tab);
   return (
      <Box width={"100%"}>
         <Grid2
            sx={{
               backgroundColor: theme.palette.template5.main,
               height: "6.4rem",
               width: "100%",
               borderRadius: "0.8rem",
               padding: "0.8rem 1rem",
            }}
            className={clsx("box-shadow")}
            container
         >
            <Grid2 xs={6}>
               <Tabs value={tab} onChange={handleChangeTab}>
                  <Tab label={"Package"} value={1} />
                  <Tab label={"Orders"} value={2} />
               </Tabs>
            </Grid2>
            <Grid2 xs={6}></Grid2>
         </Grid2>
      </Box>
   );
}

import { Box, Typography } from "@mui/material";
import React from "react";
import AdminBumpChart from "../admin-bump-chart/AdminBumpChart";
import theme from "../../style/theme";
import clsx from "clsx";
const boxStyle = {
   backgroundColor: theme.palette.template5.main,
   borderRadius: "0.8rem",
};
export default function AdminRankShopBumpChart({ data }) {
   return (
      <Box sx={{ ...boxStyle }} className={clsx("box-shadow")}>
         <Typography variant="h5" sx={{ textAlign: "center", padding: "1rem" }}>
            Arrangement of stores based on weekly revenue performance
         </Typography>
         <Box width={"100%"} height={"40rem"}>
            {data ? <AdminBumpChart data={data} /> : <></>}
         </Box>
      </Box>
   );
}

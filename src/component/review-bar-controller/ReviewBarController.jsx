import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import theme from "../../style/theme";
import clsx from "clsx";
import { Button, Tab, Tabs } from "@mui/material";

export default function ReviewBarController() {
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
            <Tabs value={1}>
               <Tab label={"Reviews"} value={1} />
            </Tabs>
         </Grid2>
         <Grid2 xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="outlined">View details</Button>
         </Grid2>
      </Grid2>
   );
}

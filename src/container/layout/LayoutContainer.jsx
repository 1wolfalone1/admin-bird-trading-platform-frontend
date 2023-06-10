import Grid from "@mui/material/Unstable_Grid2";
import s from "./layoutContainer.module.scss";
import React from "react";
import SideBar from "../side-bar/SideBar";
import { Breadcrumbs, Stack } from "@mui/material";
import HeaderContainer from "../header/HeaderContainer";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../../style/theme";
import clsx from "clsx";

export default function LayoutContainer() {
   return (
      <ThemeProvider theme={theme}>
         <div style={{ backgroundColor: theme.palette.template5 }}>
            <Grid
               container
               p={"1rem 0.5rem"}
               spacing={'2.4rem'}
               sx={{ boxSizing: "border-box", width: "100%" }}
            >
               <Grid xs={2}>
                  <SideBar />
               </Grid>
               <Grid xs={10}>
                  <Stack className={clsx(s.rightContent)}>
                     <HeaderContainer />
                     <Breadcrumbs/>
                     <div className={s.content}>
                        <Outlet />
                     </div>
                  </Stack>
               </Grid>
            </Grid>
         </div>
      </ThemeProvider>
   );
}

import clsx from "clsx";
import s from "./productShopPageController.module.scss";
import React from "react";
import { Button } from "@mui/material";
import CustomSelect from "../select-custom/CustomSelect";
import { useNavigate } from "react-router-dom";
import { breadCrumbs } from "../../config/constant";

export default function ProductShopPageController() {
   const navigate = useNavigate();
   return (
      <div className={clsx(s.controller, "box-shadow")}>
         <div className={s.right}></div>
         <div className={s.left}>
            <CustomSelect />
            <Button
               variant="outlined"
               sx={{  fontSize: "1.2rem", height: '100%', width: "30rem"}}
               onClick={() => navigate(breadCrumbs.CREATE_PRODUCTS.url)}
            >
               <span>Create products +</span>
            </Button>
         </div>
      </div>
   );
}

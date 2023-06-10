import s from "./menuItem.module.scss";
import React from "react";

import { Button } from "@mui/material";
import clsx from "clsx";
import sideBarSlice, { getCurrentActiveSelector } from "../../redux/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";


export default function MenuItem({ children, type }) {
   const currentActive = useSelector(getCurrentActiveSelector);
   const dispatch = useDispatch();

   const handleOnClick = () => {
      dispatch(sideBarSlice.actions.changeCurrentActive(type.id));
   }
   return (
      <>
         <Button className={clsx(s.container , {
            [s.active]: currentActive === type.id
         })} fullWidth color="template6" onClick={handleOnClick}>
            <div className={s.icon}>{type.Icon}</div>
            <div className={s.title}>
               <span>{type.title}</span>
            </div>
         </Button>
      </>
   );
}

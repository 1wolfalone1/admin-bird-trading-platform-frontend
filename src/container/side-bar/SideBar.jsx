import { Box, Divider } from "@mui/material";
import s from "./sideBar.module.scss";
import React from "react";
import clsx from "clsx";
import MenuItem from "../../component/menu-item/MenuItem";
import { typeMenu } from "./../../redux/sideBarSlice";
import { useSelector } from "react-redux";
import { userInfoSliceSelector } from "../../redux/userInfoSlice";

export default function SideBar() {
   const userInfo = useSelector(userInfoSliceSelector);
   console.log(userInfo);
   return (
      <div className={clsx(s.container, "box-shadow")}>
         <div className={s.adminInfo}>
            <div className={s.image}>
               <img src={userInfo.info?.avatarImgUrl} alt="" />
            </div>
            <div className={s.name}>
               <span>{userInfo.info?.shopName}</span>
            </div>
         </div>
         <div className={s.controls}>
            <div className={s.controlTasks}>
               <MenuItem type={typeMenu.DASHBOARD} />
               <MenuItem type={typeMenu.PRODUCTS} />
               <MenuItem type={typeMenu.ORDERS} />
               <MenuItem type={typeMenu.STAFF} />
               <MenuItem type={typeMenu.REVIEW} />
               <MenuItem type={typeMenu.REPORT} />
            </div>
            <div className={s.controlSetting}>
               <MenuItem type={typeMenu.SUPPORT} />
               <MenuItem type={typeMenu.SETTING} />
            </div>
            <div className={s.controlAccount}>
               <MenuItem type={typeMenu.LOGOUT} />
            </div>
         </div>
      </div>
   );
}

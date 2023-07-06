import { Box, Divider } from "@mui/material";
import s from "./sideBar.module.scss";
import React from "react";
import clsx from "clsx";
import MenuItem from "../../component/menu-item/MenuItem";
import { typeMenu } from "./../../redux/sideBarSlice";
import { useSelector } from "react-redux";
import {
   userInfoSliceSelector,
   userRoleSelector,
} from "../../redux/userInfoSlice";
import { api } from "../../api/api";

export default function SideBar() {
   const userInfo = useSelector(userInfoSliceSelector);
   const role = useSelector(userRoleSelector);
   console.log(userInfo);
   const handleLogout = () => {
      try {
         const token = localStorage.getItem("token");
         console.log(token);
         window.location.href = `${process.env.REACT_APP_REDIRECT_USER}get-token?token=${token}`; // Redirect to the desired page
      } catch (e) {
         const error = e.response.data;
         if (error.errorCode === "400") {
         }
         console.log(e);
      }
   };
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
            {role === 2 && (
               <>
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
                     <MenuItem type={typeMenu.LOGOUT} logout={handleLogout} />
                  </div>
               </>
            )}
            {
               role === 3 && (
                  <>
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
                        <MenuItem type={typeMenu.LOGOUT} logout={handleLogout} />
                     </div>
                  </>
               )
            }
            {
               role === 4 && (
                  <>
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
                        <MenuItem type={typeMenu.LOGOUT} logout={handleLogout} />
                     </div>
                  </>
               )
            }
         </div>
      </div>
   );
}

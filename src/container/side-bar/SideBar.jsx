import { Box, Divider } from "@mui/material";
import s from "./sideBar.module.scss";
import React from "react";
import clsx from "clsx";
import MenuItem from "../../component/menu-item/MenuItem";
import { typeMenu } from './../../redux/sideBarSlice';

export default function SideBar() {
   return (
      <div className={clsx(s.container, "box-shadow")}>
         <div className={s.adminInfo}>
            <div className={s.image}>
               <img
                  src="https://th.bing.com/th/id/OIP.p9591Rzm4uDVLBW-HTHXEgHaHa?pid=ImgDet&rs=1"
                  alt=""
               />
            </div>
            <div className={s.name}>
               <span>Cao Nhat Thien</span>
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

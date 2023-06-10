import { createSlice } from "@reduxjs/toolkit";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Groups2Icon from '@mui/icons-material/Groups2';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';

const commonStyle = {
   icon: {
      fontSize: '3.2rem'
   }
};

export const typeMenu = {
   DASHBOARD: {
      Icon: <AnalyticsIcon sx={commonStyle.icon} color="template6"/>,
      title: "Dashboard",
      id: 1,
   },
   PRODUCTS: {
      Icon: <InventoryIcon sx={commonStyle.icon} color="template6"/>,
      title: "Products",
      id: 2,

   },
   ORDERS: {
      Icon: <ReceiptIcon sx={commonStyle.icon} color="template6"/>,
      title: "Orders",
      id: 3,

   },
   STAFF: {
      Icon: <Groups2Icon sx={commonStyle.icon} color="template6"/>,
      title: "Staffs",
      id: 4,

   },
   REVIEW: {
      Icon: <RateReviewIcon sx={commonStyle.icon} color="template6"/>,
      title: "Reviews",
      id: 5,

   },
   REPORT: {
      Icon: <SummarizeIcon sx={commonStyle.icon} color="template6"/>,
      title: "Reports",
      id: 6,

   },
   SETTING: {
      Icon: <SettingsApplicationsIcon sx={commonStyle.icon} color="template6"/>,
      title: "Settings",
      id: 7,

   },
   SUPPORT: {
      Icon: <SupportAgentIcon sx={commonStyle.icon} color="template6"/>,
      title: "Support",
      id: 8,

   },
   LOGOUT: {
      Icon: <LogoutIcon sx={commonStyle.icon} color="template6"/>,
      title: "Logout",
      id: 9,

   },
};

const sideBarSlice = createSlice({
   name: 'sideBarSlice',
   initialState: {
      currentActive: typeMenu.DASHBOARD.id,
   },
   reducers :{
      changeCurrentActive: (state, action) => {
         state.currentActive = action.payload;
      }
   }
})

export default sideBarSlice;


export const getCurrentActiveSelector = state =>  state.sideBarSlice.currentActive;
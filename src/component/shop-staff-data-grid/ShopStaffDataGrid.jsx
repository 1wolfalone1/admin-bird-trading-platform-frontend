import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import shopStaffSlice from "../../redux/shopStaffSlice";

export default function ShopStaffDataGrid() {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(shopStaffSlice.actions.changeTab(1));
   }, []);

   return <div>ShopStaffDataGrid</div>;
}

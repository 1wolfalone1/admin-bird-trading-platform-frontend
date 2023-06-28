


import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import shopOrderSlice from '../../redux/shopOrderSlice';

export default function ShopOrderDetailsDataGrid() {
  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(shopOrderSlice.actions.changeTab(2));
   }, []);
  return (
    <div>ShopOrderDetailsDataGrid</div>
  )
}

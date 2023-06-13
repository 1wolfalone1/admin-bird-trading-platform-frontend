


import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { breadCrumbs } from './../config/constant';
import sideBarSlice from "../redux/sideBarSlice";

export default function useBreadCrumb(breadCrumbsPath) {
   const dispatch = useDispatch();
   console.log(breadCrumbsPath);
   useEffect(() => {
      dispatch(sideBarSlice.actions.changeBreadCrumb(breadCrumbsPath));
   }, []);
}

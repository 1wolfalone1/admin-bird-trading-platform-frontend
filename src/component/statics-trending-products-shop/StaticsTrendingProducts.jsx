import s from "./statticsTrendingProducts.module.scss";
import React from "react";
import { clsx } from "clsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StaticsTrendingProductsBumpChart from "../chart/statics-treding-products-bump-chart/StaticsTrendingProductsBumpChart";
import { motion } from 'framer-motion';
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../api/api";

export default function StaticsTrendingProducts() {
   const [staticsTrending, setStaticTreding] =  useState(null);
   useEffect(() => {
      getStaticTrending();
   }, []);
   const getStaticTrending = async () => {
      try {
         const response = await api.get('/shop-owner');
         const data = await response.data;
         console.log(data);
         setStaticTreding(data);
      } catch (err) {
         console.error(err);
      }
   }
   const animation = {
      init: {
         opacity: 0,
      },
      animate: {
         opacity: 1,
         transition: {
            duration: 2,
         },
      },
      exit: {
         opacity: 0.5,
      },
   };
   return (
      <motion.div
         variants={animation}
         initial="init"
         animate="animate"
         exit={"exit"}
         className={clsx(s.container, "box-shadow")}
      >
         <div className={s.title}>
            <span className={s.span}>Price trending from</span>
            <DatePicker color="template5" />
            <span className={s.span}> to now</span>
         </div>
         <div className={s.chart}>
            <StaticsTrendingProductsBumpChart data={staticsTrending}/>
         </div>
      </motion.div>
   );
}

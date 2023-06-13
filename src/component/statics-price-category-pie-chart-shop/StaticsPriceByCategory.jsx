import clsx from "clsx";
import s from "./staticsPriceByCategory.module.scss";
import React from "react";
import StaticsPriceCategoryPieChart from "../chart/stattics-price-category-pie-chart-shop/StaticsPriceCategoryPieChart";
import { motion } from "framer-motion";

export default function StaticsPriceByCategory() {
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
            <span>Pie chart in categories</span>
         </div>
         <div className={s.chart}>
            <StaticsPriceCategoryPieChart />
         </div>
      </motion.div>
   );
}

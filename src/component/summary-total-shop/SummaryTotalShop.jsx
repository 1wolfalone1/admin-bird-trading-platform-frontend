import clsx from "clsx";
import s from "./summaryTotalShop.module.scss";
import React from "react";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SummaryChartShop from "../chart/summary-chart/SummaryChartShop";
import { motion } from "framer-motion";
import { useId } from "react";
export default function SummaryTotalShop() {
   const id = useId();
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
         key={id}
      >
         <div className={s.metric}>
            <h4>Total order</h4>
            <span>432</span>
            <span>
               13% <TrendingDownIcon />
            </span>
         </div>
         <div className={s.chart}>
            <SummaryChartShop />
         </div>
      </motion.div>
   );
}

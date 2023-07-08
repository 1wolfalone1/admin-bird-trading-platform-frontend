import React from "react";
import ReviewTable from "../../component/review-table/ReviewTable";
import ReviewBarController from "../../component/review-bar-controller/ReviewBarController";
import s from "./reviewPage.module.scss";


export default function ReviewPage() {
   return (
      <div className={s.container}>
         <div className={s.headerTable}>
            <h2>Staff manager</h2>
            <ReviewBarController />
         </div>
         <div style={{ height: "60rem", width: "100%" }}>
            <ReviewTable />
         </div>
      </div>
   );
}

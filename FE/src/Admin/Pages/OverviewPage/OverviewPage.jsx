import React from "react";
import Styles from "./Overview.module.css";
import Chart from "../../components/Chart";
import Overview from "../../components/Overview/Overview";
function OverviewPage() {
  return (
    <div className={Styles.overview_page}>
      <div className="d-flex">
        <Overview />
        <Overview
          img_icon="doctor_logo.png"
          total_quantity="5"
          des_quantity="Doctor"
        />
        <Overview
          img_icon="comment_logo.png"
          total_quantity="13"
          des_quantity="Comment"
        />
      </div>
      <div className={Styles.chart}>
        <Chart />
        <Chart />
        <Chart />
      </div>
    </div>
  );
}

export default OverviewPage;

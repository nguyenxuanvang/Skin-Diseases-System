import React from "react";
import TestDiagno from "./TestDiagnose";
import TestPageSlider from "./TestPageSlider";
import Styles from "./TestPage.module.css";
import TestDiagno_Result from "./TestDiagno_Result";
import Footer from "../../components/Footer/Footer";
function TestPage() {
  return (
    <>
      <div className={Styles.testPage_Slider}>
        <TestPageSlider />
      </div>

      <div className={Styles.testPage_Des}>Diagnose through images</div>

      <div className={Styles.testPage_Diagno}>
        <TestDiagno />
      </div>

      {/* <div className={Styles.testPage_Result}>
        <TestDiagno_Result />
      </div> */}

      <div className={Styles.testPage_Footer}>
        <Footer />
      </div>
    </>
  );
}

export default TestPage;

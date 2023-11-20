import React, { useState, useEffect } from 'react';
import TestDiagno from './TestDiagnose'
import TestPageSlider from './TestPageSlider'
import Styles from "./TestPage.module.css"
import { MyProvider } from '../../MyContext/context'
import TestDiagno_Result from './TestDiagno_Result'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header';

function TestPage() {

  return (
    <>
        <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
          <Header />
        </div>
        <div className={Styles.testPage_Slider}>
          <TestPageSlider />
        </div>
        <div className={Styles.testPage_Des}>
          Diagnose through images
        </div>

        <MyProvider>

          <div className={Styles.testPage_Diagno}>
            <TestDiagno/>
          </div>

          <div className={Styles.testPage_Result}>
            <TestDiagno_Result />
          </div>

        </MyProvider>

        <div className={Styles.testPage_Footer}>
          <Footer />
        </div>

    </>
  )
}

export default TestPage
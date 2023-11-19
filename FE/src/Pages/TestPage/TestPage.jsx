import React, { useState, useEffect } from 'react';
import TestDiagno from './TestDiagnose'
import TestPageSlider from './TestPageSlider'
import Styles from "./TestPage.module.css"
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
function TestPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <Header />
      </div>
      <Spin spinning={loading} size="large">
        <div className={Styles.testPage_Slider}>
          <TestPageSlider />
        </div>
        <div className={Styles.testPage_Des}>
          Diagnose through images
        </div>

        <div className={Styles.testPage_Diagno}>
          <TestDiagno />
        </div>

        <div className={Styles.testPage_Footer}>
          <Footer />
        </div>
      </Spin>
    </>
  )
}

export default TestPage
import React, { useState, useEffect } from 'react';
import HomeDoctorBanner from '../../components/HomeDoctors/HomeDoctorBanner'
import IntroductionSlider from './IntroductionSlider'
import IntroductionDiagno from './IntroductionDiagno'
import IntroductionGoal from './IntroductionGoal'
import Styles from './Introduction.module.css'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
function Introduction() {
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
      <Spin spinning={loading} size="large" tip="SkinDiagnoTech..." >
        <div className={Styles.introduction_Slider}>
          <IntroductionSlider />
        </div>

        <div className={Styles.introduction_Diagno}>
          <IntroductionDiagno />
        </div>

        <div className={Styles.introduction_Goal}>
          <IntroductionGoal />
        </div>

        <div className={Styles.introduction_Dotor}>
          <HomeDoctorBanner />
        </div>

        <div className={Styles.introduction_Footer}>
          <Footer />
        </div>
      </Spin>
    </>
  )
}

export default Introduction
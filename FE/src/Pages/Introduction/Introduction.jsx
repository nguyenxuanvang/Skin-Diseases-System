import React, { useState, useEffect } from 'react';
import HomeDoctorBanner from '../../components/HomeDoctors/HomeDoctorBanner'
import IntroductionSlider from './IntroductionSlider'
import IntroductionDiagno from './IntroductionDiagno'
import IntroductionGoal from './IntroductionGoal'
import Styles from './Introduction.module.css'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function Introduction() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('token')) {
      setIsLogin(true);
    }
  },[]);
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        {(isLogin) ? <HeaderL/> : <Header/>}
      </div>
      
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
      
    </>
  )
}

export default Introduction
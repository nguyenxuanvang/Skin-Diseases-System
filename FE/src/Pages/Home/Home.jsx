import React, { useState, useEffect } from 'react';
import Styles from './Home.module.css'
import HomeSlider from './ImageSlider'
import HomeIntroduction from './HomeIntroduction'
import HomeDiagnose from './HomeDiagnose'
import HomeNews from './HomeNews'
import HomeDoctorBanner from '../../components/HomeDoctors/HomeDoctorBanner'
import HomeContact from './HomeContact'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function Home() {
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
      
        <div className={Styles.home}>
          <div className={Styles.home_Slider}>
            <HomeSlider />
          </div>
          <div className={Styles.home_Introduction}>
            <HomeIntroduction />
          </div>
          <div className={Styles.home_Diagnose}>
            <HomeDiagnose />
          </div>

          <div className={Styles.home_News}>
            <HomeNews />
          </div>

          <div className={Styles.home_Doctor}>
            <HomeDoctorBanner />
          </div>

          <div className={Styles.home_Contact}>
            <HomeContact />
          </div>

          <div className={Styles.home_Footer}>
            <Footer />
          </div>
        </div>
    </>
  )
}

export default Home
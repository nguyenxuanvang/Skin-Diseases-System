import React, { useState, useEffect } from 'react';
import Styles from './InformationDoctorPage.module.css'
import InformationDoctorBanner from './InformationDoctorBanner'
import InformationDoctorList from './InformationDoctorList'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function InformationDoctorPage() {
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
        <div className={Styles.informationDoctorPage_banner}>
          <InformationDoctorBanner />
        </div>

        <div className={Styles.informationDoctorPage_List}>
          <InformationDoctorList />
        </div>

        <div className={Styles.informationDoctorPage_Footer}>
          <Footer/>
        </div>
    </>
  )
}

export default InformationDoctorPage
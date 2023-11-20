import React, { useState, useEffect } from 'react';
import Styles from './InformationDoctorPage.module.css'
import InformationDoctorBanner from './InformationDoctorBanner'
import InformationDoctorList from './InformationDoctorList'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
function InformationDoctorPage() {
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
        <div className={Styles.informationDoctorPage_banner}>
          <InformationDoctorBanner />
        </div>

        <div className={Styles.informationDoctorPage_List}>
          <InformationDoctorList />
        </div>

        <div className={Styles.informationDoctorPage_Footer}>
          <Footer/>
        </div>
      </Spin>
    </>
  )
}

export default InformationDoctorPage
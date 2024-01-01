import React, { useState, useEffect } from 'react';
import TestDiagno from './TestDiagnose'
import TestPageSlider from './TestPageSlider'
import Styles from "./TestPage.module.css"
import { MyProvider } from '../../MyContext/context'
import TestDiagno_Result from './TestDiagno_Result'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';

function TestPage() {
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
        <div className={Styles.testPage_Slider}>
          <TestPageSlider />
        </div>
        <div className={Styles.testPage_Des}>
          Chẩn Đoán Bằng Hình Ảnh
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
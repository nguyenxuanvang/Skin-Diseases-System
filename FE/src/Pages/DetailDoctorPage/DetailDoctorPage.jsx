import React, { useState, useEffect } from 'react';
import DoctorInformation from '../../components/DoctorInformation'
import NewsBanner from '../News/NewsBanner'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function DetailDoctorPage() {
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
      
        <div>
          <NewsBanner news_Title='Đội ngũ bác sĩ' />
        </div>
        <div>
          <DoctorInformation />
        </div>
     
    </>
  )
}

export default DetailDoctorPage
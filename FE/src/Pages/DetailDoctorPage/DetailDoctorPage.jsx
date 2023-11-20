import React, { useState, useEffect } from 'react';
import DoctorInformation from '../../components/DoctorInformation'
import NewsBanner from '../News/NewsBanner'
import { Spin } from 'antd';
import Header from '../../components/Header';
function DetailDoctorPage() {
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
        <div>
          <NewsBanner news_Title='Đội ngũ bác sĩ' />
        </div>
        <div>
          <DoctorInformation />
        </div>
      </Spin>
    </>
  )
}

export default DetailDoctorPage
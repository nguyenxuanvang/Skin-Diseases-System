import React, { useEffect, useState } from 'react'
import Style from './DetailDoctorInformation.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { FaPhoneAlt, FaAddressCard, FaMailBulk } from "react-icons/fa";
import { Spin } from 'antd';
import Doctorcareer from './Doctorcareer';
import HeaderL from '../../../components/HeaderL/Header';
import personalApi from '../../../redux/api/personalApi.slice';
function DetailDoctorInformation() {
  const {data = {}} = personalApi.useGetDetailInforQuery();
  const [doctor, setDoctor] = useState({});
  useEffect(()=>{
    setDoctor(data.user);
  },[data])
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <HeaderL />
      </div>
      <div className={Style.detailDoctorInformation_sidebar}>
        <Sidebar />
      </div>
      <div className='d-flex' style={{ marginLeft: '350px' }}>
        {(doctor) ?
        <div className={Style.detailDoctorInformation_avatar}>
          <img src={`http://localhost:3000/detail/image/${doctor.avatar}`} alt="" />
        </div> : 
        <div className={Style.detailDoctorInformation_avatar}>
          <img src="" alt="" />
        </div>
        }
        
        <div className={Style.detailDoctorInformation_des}>
          {(!doctor) ?
          <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
            <Spin spinning={true} size="large" tip="SkinDiagnoTech..." ></Spin>
          </div> :
          <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
            <h3>{(doctor.name) ? doctor.name : 'Chưa Cập Nhật'}</h3>
            <p><FaPhoneAlt />   {(doctor.phone) ? doctor.phone : 'Chưa Cập Nhật'}</p>
            <p><FaAddressCard />  {(doctor.address) ? doctor.address : 'Chưa Cập Nhật'}</p>
            <p><FaMailBulk /> {(doctor.email) ? doctor.email : 'Chưa Cập Nhật'}</p>
          </div>
          }
          
        </div>
      </div>

      <div style={{ margin: '50px 0 0 350px' }}>
        <Doctorcareer />
      </div>
    </>
  )
}

export default DetailDoctorInformation
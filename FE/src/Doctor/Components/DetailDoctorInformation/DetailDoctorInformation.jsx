import React from 'react'
import Style from './DetailDoctorInformation.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { FaPhoneAlt, FaAddressCard, FaMailBulk } from "react-icons/fa";
import Doctorcareer from './Doctorcareer';
import Header from '../Header';
function DetailDoctorInformation(
  {
    doctor_name = 'Tên bác sĩ',
    doctor_phone = '0987654321',
    doctor_address = 'Da Nang',
    doctor_mail = '123@gmail.com'
  }
) {
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <Header />
      </div>
      <div className={Style.detailDoctorInformation_sidebar}>
        <Sidebar />
      </div>
      <div className='d-flex' style={{ marginLeft: '350px' }}>
        <div className={Style.detailDoctorInformation_avatar}>
          <img src="./images/Doctor/account_doctor.png" alt="" />
        </div>

        <div className={Style.detailDoctorInformation_des}>
          <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
            <h3>{doctor_name}</h3>
            <p><FaPhoneAlt />  {doctor_phone}</p>
            <p><FaAddressCard /> {doctor_address}</p>
            <p><FaMailBulk /> {doctor_mail}</p>
          </div>
        </div>
      </div>

      <div style={{ margin: '50px 0 0 350px' }}>
        <Doctorcareer />
      </div>
    </>
  )
}

export default DetailDoctorInformation
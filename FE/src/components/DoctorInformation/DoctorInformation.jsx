import React from 'react'
import Styles from './DoctorInformation.module.css';
import { AiTwotoneHome } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import DoctorInformationDetail from './DoctorInformationDetail';
function DoctorInformation(
  {
    doctor_img = 'doctor_img_1.png'
  }
) {
  return (
    <div className={Styles.doctorInformation}>
      <div className={Styles.doctorInformation_img}>

        <img src="./images/DoctorBanner/detailDoctorBanner.jpg" alt="" />

        <div className={Styles.doctorInformation_add}>
          <p style={{ textAlign: 'right', marginRight: '50px', height: '50px', lineHeight: '50px', fontWeight: 'bold' }}>Thông tin chi tiết</p>
        </div>

        <div className={Styles.doctorInformation_doctor_img}>

          <img src={`./images/Doctor/${doctor_img}`} alt="" style={{ height: '200px', width: '200px' }} />

          <div className={Styles.doctorInformation_detail}>

            <div className={Styles.doctorInformation_link}>
              <Link to='/Home'><AiTwotoneHome /></Link>
              <Link to='/Doctor'><FaAngleRight />Doctor</Link>
              <span><FaAngleRight />Doctor Steve Quin</span>
            </div>

            <p>Doctor Steve Quin</p>
          </div>
        </div>

      </div>
      <div className={Styles.doctorInformation_des}>
        <div>
          <DoctorInformationDetail />

          <DoctorInformationDetail iconName='BsFillBagPlusFill' introduction='Chức vụ'/>

          <DoctorInformationDetail iconName='BsHospitalFill' introduction='Nơi làm việc'/>

          <DoctorInformationDetail iconName='BsBookFill' introduction='Kinh nghiệm'/>
        </div>
        
      </div>
    </div>
  )
}

export default DoctorInformation
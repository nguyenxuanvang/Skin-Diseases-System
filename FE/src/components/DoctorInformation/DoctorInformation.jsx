import React, { useState } from 'react'
import Styles from './DoctorInformation.module.css';
import { AiTwotoneHome } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DoctorInformationDetail from './DoctorInformationDetail';
import doctorApi from '../../redux/api/doctor.slice';
function DoctorInformation() {
  const [getDoctor,{data = {}}] = doctorApi.useLazyGetDoctorQuery();
  const { id } = useParams();
  useState(()=>{
    getDoctor(id);
  },[id]);
  return (
    <div className={Styles.doctorInformation}>
      <div className={Styles.doctorInformation_img}>

        <img src="/images/DoctorBanner/detailDoctorBanner.jpg" alt="" />

        <div className={Styles.doctorInformation_add}>
          <p style={{ textAlign: 'right', marginRight: '50px', height: '50px', lineHeight: '50px', fontWeight: 'bold' }}>Thông tin chi tiết</p>
        </div>

        <div className={Styles.doctorInformation_doctor_img}>

          <img src={`http://localhost:3000/doctor/image/${data.data?.Doctor_id}`} alt="" style={{ height: '200px', width: '200px' }} />

          <div className={Styles.doctorInformation_detail}>

            <div className={Styles.doctorInformation_link}>
              <Link to='/Home'><AiTwotoneHome /></Link>
              <Link to='/Doctor'><FaAngleRight />Bác Sĩ</Link>
              <span><FaAngleRight />{data.data?.name}</span>
            </div>
            <p>{data.data?.name}  {(data.data?.approved) ? <img style={{width: "30px", height: "30px"}} src="http://localhost:3000/doctor/request/tick.png"/> : ''}</p>
          </div>
        </div>

      </div>
      <div className={Styles.doctorInformation_des}>
        <div>
          <DoctorInformationDetail iconName = 'BsFillInfoCircleFill' introduction='Giới thiệu' content={data.data?.introduce}/>

          <DoctorInformationDetail iconName='BsFillBagPlusFill' introduction='Chức vụ' content={data.data?.position}/>

          <DoctorInformationDetail iconName='BsHospitalFill' introduction='Nơi làm việc' content={data.data?.work_location}/>

          <DoctorInformationDetail iconName='BsBookFill' introduction='Kinh nghiệm' content={data.data?.experience}/>
        </div>
        
      </div>
    </div>
  )
}

export default DoctorInformation
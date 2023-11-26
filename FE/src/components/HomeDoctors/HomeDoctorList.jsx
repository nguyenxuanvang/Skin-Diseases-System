import React from 'react'
import Styles from './HomeDoctorList.module.css'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
function HomeDoctorList({info}) {
  return (
    <>
    <div className={Styles.container}>
        <div className={Styles.doctorImage}>
            <img src={`http://localhost:3000/detail/image/${info?.avatar}`} alt="" />
        </div>
        <div className={Styles.doctorContext}>
            <div className={Styles.doctorName}>
                <p>{info?.name}</p>
            </div>

            <div className={Styles.doctorExperience}>
                <p>{(info?.introduce) ? info.introduce : 'Chưa Có Giới Thiệu'}</p>
            </div>

            <div className={Styles.doctorBtn}>
            <button className={Styles.btn_seeMore}><Link to='/DetailDoctorPage' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>Xem Thêm</Link><FaAngleRight /></button>

            </div>
        </div>
    </div>
    </>
  )
}

export default HomeDoctorList
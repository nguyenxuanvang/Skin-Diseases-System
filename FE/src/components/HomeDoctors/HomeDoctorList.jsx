import React from 'react'
import Styles from './HomeDoctorList.module.css'
import { FaAngleRight } from "react-icons/fa";
function HomeDoctorList({
    img_doctorImage = 'doctor_img_1.png', 
        doctorNames = 'Doctor Steve Quin',
        doctorExperiences = 'Bác sĩ có hơn 10 năm kinh nghiệm trong lĩnh vực Da liễu - Da liễu Thẩm mỹ',
        btn_seeMore = 'See more'
}) {
  return (
    <>
    <div className={Styles.container}>
        <div className={Styles.doctorImage}>
            <img src={`./images/Doctor/${img_doctorImage}`} alt="" />
        </div>
        <div className={Styles.doctorContext}>
            <div className={Styles.doctorName}>
                <p>{doctorNames}</p>
            </div>

            <div className={Styles.doctorExperience}>
                <p>{doctorExperiences}</p>
            </div>

            <div className={Styles.doctorBtn}>
                <button className={Styles.btn_seeMore}>{btn_seeMore}<FaAngleRight/></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default HomeDoctorList
import React from 'react'
import HomeDoctorList from './HomeDoctorList'
import Styles from './HomeDoctorList.module.css'
import { FaAngleRight } from "react-icons/fa";
function HomeDoctorBanner({
    doctorTeam = 'Đội ngũ',
    doctorTitle = 'Đội ngũ Bác sĩ chuyên môn',
    doctorDes = 'Đội ngũ Bác Sĩ đến từ SkinDiagnoTech',
    doctorTeamBtn = 'See More',
    img_doctorTeamImage = 'image_banner_doctor_2.png'
}) {
    return (
        <div className={Styles.home_DoctorHeader}>
            <div className={Styles.home_DoctorContainer}>
                <div className={Styles.home_DoctorTeamImg}>
                    <img src={`./images/Doctor/${img_doctorTeamImage}`} alt="" />
                </div>
                <div className={Styles.home_DoctorTeamIntro}>
                    <div className={Styles.home_DoctorTeam}>{doctorTeam}</div>
                    <div className={Styles.home_DoctorTitle}>{doctorTitle}</div>
                    <div className={Styles.home_DoctorDes}>{doctorDes}</div>
                    <div className={Styles.home_DoctorTeamBtn}>
                        <button className={Styles.btn_TeamseeMore}>{doctorTeamBtn}<FaAngleRight /></button>
                    </div>
                </div>
            </div>
            <div className={Styles.home_DoctorTeamList}>
                <HomeDoctorList />
                <HomeDoctorList img_doctorImage='doctor_img_2.png' />
                <HomeDoctorList img_doctorImage='doctor_img_5.png' />
                <HomeDoctorList img_doctorImage='doctor_img_4.png' />
                <HomeDoctorList img_doctorImage='doctor_img_6.png' />
            </div>
        </div>
    )
}

export default HomeDoctorBanner
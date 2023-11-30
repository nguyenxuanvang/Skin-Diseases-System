import React from 'react'
import HomeDoctorList from './HomeDoctorList'
import Styles from './HomeDoctorList.module.css'
import { FaAngleRight } from "react-icons/fa";
import doctorApi from '../../redux/api/doctor.slice';
import { useNavigate } from "react-router-dom";
function HomeDoctorBanner() {
    const {data = {}} = doctorApi.useGetListDoctorQuery();
    const navigate = useNavigate();
    return (
        <div className={Styles.home_DoctorHeader}>
            <div className={Styles.home_DoctorContainer}>
                <div className={Styles.home_DoctorTeamImg}>
                    <img src={`/images/Doctor/image_banner_doctor_2.png`} alt="" />
                </div>
                <div className={Styles.home_DoctorTeamIntro}>
                    <div className={Styles.home_DoctorTeam}>Đội ngũ</div>
                    <div className={Styles.home_DoctorTitle}>Đội ngũ Bác sĩ chuyên môn</div>
                    <div className={Styles.home_DoctorDes}>Đội ngũ Bác Sĩ đến từ SkinDiagnoTech</div>
                    <div className={Styles.home_DoctorTeamBtn}>
                        <button className={Styles.btn_TeamseeMore} onClick={()=>{navigate("/Doctor")}}>See More<FaAngleRight /></button>
                    </div>
                </div>
            </div>
            <div className={Styles.home_DoctorTeamList}>
                {data.data?.map(item => (
                    <HomeDoctorList key={item.Doctor_id} info={item}/>
                ))}
            </div>
        </div>
    )
}

export default HomeDoctorBanner
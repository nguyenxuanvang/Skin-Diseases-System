import React from 'react'
import Styles from './InformationDoctorPage.module.css'
function InformationDoctorBanner(
{
    doctorBanner_img = "banner_information_doctor.png",
    doctor_Title = "Đội ngũ Bác sĩ chuyên môn"
}) {
  return (
    <div className={Styles.informationDoctor_header}>
       <img src={`./images/InformationDoctorBanner/${doctorBanner_img}`} alt="" />

        <div className={Styles.informationDoctor_Title}>
            {doctor_Title}
        </div>
    </div>
  )
}

export default InformationDoctorBanner
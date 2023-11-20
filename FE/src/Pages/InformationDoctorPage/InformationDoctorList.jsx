import React from 'react'
import Styles from './InformationDoctorPage.module.css'
import HomeDoctorList from '../../components/HomeDoctors/HomeDoctorList'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function InformationDoctorList({
    doctor_Subtitle = 'Đội ngũ Bác sĩ của Skin Diagno Tech',
}) {
    return (
        <>
            <div className={Styles.informationDoctor_Subtitle}>{doctor_Subtitle}</div>
            <div className={Styles.informationDoctor_List}>
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
                <HomeDoctorList />
            </div>
        </>
    )
}

export default InformationDoctorList
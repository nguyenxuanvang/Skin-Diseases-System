import React, { useEffect } from 'react'
import Styles from './InformationDoctorPage.module.css'
import HomeDoctorList from '../../components/HomeDoctors/HomeDoctorList'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import doctorApi from '../../redux/api/doctor.slice';
function InformationDoctorList() {
    const { data = {} } = doctorApi.useGetListDoctorQuery();
    return (
        <>
            {(data.data?.length > 0) ?
                <div className={Styles.informationDoctor_Subtitle}>Đội ngũ Bác sĩ của Skin Diagno Tech</div>
                :
                <div className={Styles.informationDoctor_Subtitle} style={{margin: '100px 0px',color: 'red'}}>Danh Sách Bác Sĩ Trống</div>
            }

            {(data.data?.length > 0) ?
                <div className={Styles.informationDoctor_List}>
                    {(data.data.map(item => (
                        <HomeDoctorList info={item} />
                    )))}
                </div> :
                ""
            }

        </>
    )
}

export default InformationDoctorList
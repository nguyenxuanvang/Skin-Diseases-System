import React from 'react'
import Styles from './DoctorInformation.module.css'
import * as ReactIcons from "react-icons/bs";
function DoctorInformationDetail(
    {
        iconName = 'BsFillInfoCircleFill',
        introduction='Giới thiệu',
        description = 'Nội dung 1'
    }
) {
    const Icon = ReactIcons[iconName];
    return (
        <div className={Styles.doctorInformationDetail}>
            <div className={Styles.doctorInformationDetail_header}>
                <div className={Styles.doctorInformationDetail_headerIntro}>
                    <Icon />
                    <span style={{ marginLeft: '20px', fontWeight:'bold' }}>{introduction}</span>
                </div>
            </div>

            <div className={Styles.doctorInformationDetail_content}>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default DoctorInformationDetail
import React from 'react'
import Style from './DoctorInformationPage.module.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import DetailDoctorInformation from '../../Components/DetailDoctorInformation/DetailDoctorInformation'
import Header from '../../../Doctor/Components/Header'
function DoctorInformationPage() {
    return (
        <>
        <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
          <Header />
        </div>
        <div>
            <div><Sidebar /></div>
            <div><DetailDoctorInformation /></div>
        </div>
        </>
    )
}

export default DoctorInformationPage
import React from 'react'
import Styles from './DoctorManagementPage.module.css'
import DoctorManagement from '../../components/DoctorManagement/DoctorManagement'
import Sidebar from '../../components/Sidebar/Sidebar'
function DoctorManagementPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.doctorManagement_overview}>
        <DoctorManagement />
      </div>
    </>
  )
}

export default DoctorManagementPage
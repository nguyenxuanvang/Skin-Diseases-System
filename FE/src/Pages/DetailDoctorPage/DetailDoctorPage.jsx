import React from 'react'
import Styles from './DetailDoctorPage.module.css'
import DoctorInformation from '../../components/DoctorInformation'
import NewsBanner from '../News/NewsBanner'
function DetailDoctorPage() {
  return (
    <>
    <div>
        <NewsBanner news_Title='Đội ngũ bác sĩ'/>
    </div>
    <div>
        <DoctorInformation/>
    </div>
    </>
  )
}

export default DetailDoctorPage
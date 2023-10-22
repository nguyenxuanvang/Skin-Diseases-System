import React from 'react'
import Styles from './InformationDoctorPage.module.css'
import InformationDoctorBanner from './InformationDoctorBanner'
import InformationDoctorList from './InformationDoctorList'
import Footer from '../../components/Footer/Footer'
function InformationDoctorPage() {
  return (
    <>
      <div className={Styles.informationDoctorPage_banner}>
        <InformationDoctorBanner/>
      </div>

      <div className={Styles.informationDoctorPage_List}>
        <InformationDoctorList/>
      </div>

      <div className={Styles.informationDoctorPage_Footer}>
        <Footer/>
      </div>
    </>
  )
}

export default InformationDoctorPage
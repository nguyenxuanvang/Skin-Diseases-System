import React from 'react'
import HomeDoctorBanner from '../../components/HomeDoctors/HomeDoctorBanner'
import IntroductionSlider from './IntroductionSlider'
import IntroductionDiagno from './IntroductionDiagno'
import IntroductionGoal from './IntroductionGoal'
import Styles from './Introduction.module.css'
import Footer from '../../components/Footer/Footer'
function Introduction() {
  return (
    <>
    <div className={Styles.introduction_Slider}>
    <IntroductionSlider/>
    </div>

    <div className={Styles.introduction_Diagno}>
    <IntroductionDiagno/>
    </div>

    <div className={Styles.introduction_Goal}>
    <IntroductionGoal/>
    </div>

    <div className={Styles.introduction_Dotor}>
    <HomeDoctorBanner/>
    </div>

    <div className={Styles.introduction_Footer}>
    <Footer/>
    </div>
    </>
  )
}

export default Introduction
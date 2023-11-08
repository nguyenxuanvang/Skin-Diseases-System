import React from 'react'
import HomeDiagnoseList from '../../components/HomeDiagnose/HomeDiagnoseList'
import Styles from './Home.module.css'
function HomeDiagnose() {
  return (
    <>
    <div className={Styles.homeDiagnoseList}>
        <HomeDiagnoseList/>
        <HomeDiagnoseList text_title='Test1' boxColor_Diagnose='#A8B8F4' text_desDiagnose='Context'/>
    </div>
    </>
  )
}

export default HomeDiagnose
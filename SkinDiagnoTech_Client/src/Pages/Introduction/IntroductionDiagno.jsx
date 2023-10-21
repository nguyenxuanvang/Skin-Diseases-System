import React from 'react'
import Styles from './Introduction.module.css'
import HomeDiagnoseList from '../../components/HomeDiagnose/HomeDiagnoseList'
function IntroductionDiagno() {
  return (
    <>
    <div className={Styles.IntroductionDiagnoList}>
        <HomeDiagnoseList/>
    </div>
    </>
  )
}

export default IntroductionDiagno
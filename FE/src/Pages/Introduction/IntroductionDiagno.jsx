import React from 'react'
import Styles from './Introduction.module.css'
import HomeDiagnoseList from '../../components/HomeDiagnose/HomeDiagnoseList'
function IntroductionDiagno() {
  return (
    <>
    <div className={Styles.IntroductionDiagnoList}>
        <HomeDiagnoseList text_desDiagnose='SkinDiagnoTech cung cấp chẩn đoán bệnh thông qua hình ảnh là một công cụ chẩn đoán quan trọng có thể giúp bác sĩ xác định bệnh và đưa ra phương pháp điều trị thích hợp.'/>
    </div>
    </>
  )
}

export default IntroductionDiagno
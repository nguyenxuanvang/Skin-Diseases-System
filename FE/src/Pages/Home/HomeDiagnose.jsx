import React from 'react'
import HomeDiagnoseList from '../../components/HomeDiagnose/HomeDiagnoseList'
import Styles from './Home.module.css'
function HomeDiagnose() {
  return (
    <>
    <div className={Styles.homeDiagnoseList}>
        <HomeDiagnoseList text_desDiagnose='SkinDiagnoTech cung cấp chẩn đoán bệnh thông qua hình ảnh là một công cụ chẩn đoán quan trọng có thể giúp bác sĩ xác định bệnh và đưa ra phương pháp điều trị thích hợp.'/>
    </div>
    </>
  )
}

export default HomeDiagnose
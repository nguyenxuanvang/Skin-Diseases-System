import React, { useState } from 'react'
import { useMyContext } from '../../MyContext/context';
import Styles from "./TestPage.module.css";
function TestDiagno_Result() {
  const { data, updateData } = useMyContext();
  return (
    <>
      <div className={Styles.result_Title}>
        Result:
      </div>

      <div className={Styles.result_img} style={{ textAlign: '-webkit-center' }}>
        <p className={Styles.disease_imgdes}>
          Hình ảnh bệnh liên quan
        </p>
        <div className={Styles.disease_imglist}>
          <img src="/images/ImgExample/mau_1.png" alt="" />
          <img src="/images/ImgExample/mau_2.png" alt="" />
          <img src="/images/ImgExample/mau_3.png" alt="" />
          <img src="/images/ImgExample/mau_3.png" alt="" />
          <img src="/images/ImgExample/mau_3.png" alt="" />
        </div>
      </div>

      <div className={Styles.result_Des}>
        <p style={{ textAlign: "center" }}>
          Tên bệnh là: {data.result}
        </p>

        <p>
          Giải pháp
        </p>

      </div>

      <div className={Styles.result_news}>
        <div style={{ margin: '50px 0 0 0', textAlign: 'center' }} >
          <h3>Những bài viết liên quan </h3>
        </div>
        <div style={{ margin: '50px 0 0 320px' }}>
          <News />
          <News />
          <News />
        </div>
      </div>
    </>
  )
}

export default TestDiagno_Result
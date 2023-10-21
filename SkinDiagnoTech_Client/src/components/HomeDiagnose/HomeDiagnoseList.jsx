import React from 'react'
import Styles from './HomeDiagnoseList.module.css'
function HomeDiagnoseList({
    boxColor_Diagnose = 'pink',
    text_title = 'Diagnose through images',
    img_Diagnose = 'DiagnoseAI_1.png',
    text_desDiagnose = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae repellendus officia deleniti cum. Dignissimos sequi quos beatae nemo voluptates eligendi earum, unde alias, est laborum qui repellat dolorum fugit nulla.' ,
}) {
    return (
        <>
            <div className={Styles.homeDiagnoseList}>
                <div className={Styles.homeDiagnose_title}>{text_title}</div>
                <div className={Styles.homeDiagnose_context}
                style ={{backgroundColor: boxColor_Diagnose}}>
                    <div className={Styles.homeDiagnose_img}>
                        <img src={`./images/DiagnoseAI/${img_Diagnose}`} alt="" style={{width:'300px', height:'300px'}}/>
                    </div>
                    <div className={Styles.homeDiagnose_RightColumn}>
                        <div className={Styles.homeDiagnose_des}>
                            <p>{text_desDiagnose}</p>
                        </div>

                        <div className={Styles.homeDiagnose_btn}>
                            <button className={Styles.homeDiagnose_btnScan}>Scan</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeDiagnoseList
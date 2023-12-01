import React from 'react'
import Styles from './Overview.module.css'
function Overview({img_icon,total_quantity,des_quantity}) {
  return (
    <div className={Styles.overview}>
        <div className={Styles.des_left}>
            <img src={`./images/Overview/${img_icon}`} alt="" className={Styles.icon_img}style={{ height: '70px', width: '70px' }}/>
        </div>

        <div className={Styles.des_right}>
            <div className={total_quantity}>
                {total_quantity}
            </div>
            <div className={Styles.des_quantity}>
                {des_quantity}
            </div>
        </div>
    </div>
  )
}

export default Overview
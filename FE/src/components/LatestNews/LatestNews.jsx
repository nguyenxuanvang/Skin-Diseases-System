import React from 'react'
import Styles from './LatestNews.module.css'
function LatestNews(
    {
        latest_img = 'newsImage_2.jpg',
        latest_des = 'Nội dung 1'
    }
) {
    return (
        <>
            <div className={Styles.latestNews}>
                <div className={Styles.latestNews_img}>
                    <img src={`./images/News/${latest_img}`} alt="" style={{ height: '50px', width: '50px' }} />
                </div>
                <div className={Styles.latestNews_des} style={{padding:'10px 0 0 10px'}}>
                    {latest_des}
                </div>
            </div>
        </>
    )
}

export default LatestNews
import React from 'react'
import Styles from './DetailNews.module.css'
function DetailNews({news}) {
    const date = new Date(news?.updatedAt);
    const time = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() 
    + ' ' + date.getHours() + ":" + date.getMinutes() + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return (
        <div className={Styles.detailNews}>
            <div className={Styles.detailNews_title}>
                {news?.Title}
            </div>

            <div className={Styles.detailNews_date}>
                Lần Cập Nhật Cuối: {time}
            </div>

            <div className={Styles.detailNews_img}>
                <img src={`http://localhost:3000/news/image/${news?.image}`} alt="" style={{height:'500px'}}/>
            </div>

            <div className={Styles.detailNews_des}>
                {news?.Content} 
            </div>
        </div>
    )
}

export default DetailNews
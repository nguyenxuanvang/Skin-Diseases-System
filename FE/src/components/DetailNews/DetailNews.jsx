import React from 'react'
import Styles from './DetailNews.module.css'
function DetailNews({news}) {
    const date = new Date(news?.updatedAt);
    const time = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`)
        + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`)
        + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
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
                <pre style={{ whiteSpace: "break-spaces" }}>{news?.Content}</pre>
            </div>
        </div>
    )
}

export default DetailNews
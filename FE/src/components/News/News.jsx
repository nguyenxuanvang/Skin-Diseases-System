import React from 'react'
import Styles from './News.module.css'
import { FaAngleRight } from "react-icons/fa";
import {Link} from 'react-router-dom'
function News({news}) {
    const date = new Date(news?.updatedAt);
    const time = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() 
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return (
        <>
            <div className={Styles.newsList_posts}>
                <div className={Styles.newsList_postsList}>
                    <div className={Styles.newsList_img}>
                        <img src={`http://localhost:3000/news/image/${news?.image}`} alt="" style={{ height: '300px', width: '330px', borderRadius: '20px 0 0 20px' }} />
                    </div>

                    <div className={Styles.newsList_inf}>
                        <div className={Styles.newsList_date}>
                            {time}
                        </div>
                        <div className={Styles.newsList_name}>
                            {news?.Title}
                        </div>
                        <div className={Styles.newsList_des}>
                            <p>{news?.Content}</p>
                        </div>
                        <div className={Styles.newsList_btn}>
                            <button className={Styles.btn_seeMore}><Link to={`/DetailNewsPage/${news?.News_id}`}>Xem Thêm<FaAngleRight /></Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
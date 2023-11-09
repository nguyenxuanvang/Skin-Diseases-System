import React from 'react'
import Styles from './News.module.css'
import { FaAngleRight } from "react-icons/fa";
import {Link} from 'react-router-dom'
function News(
    {
        newsList_imgs = 'newsImage_1.jpg',
        news_date = '09/11/2023',
        news_name = 'Nội dung 1',
        news_des = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti ullam incidunt voluptatibus totam maxime odit explicabo consequatur, vel consequuntur culpa fuga adipisci dolor dicta id doloribus saepe rerum fugit quod.'
    }) {
    return (
        <>
            <div className={Styles.newsList_posts}>
                <div className={Styles.newsList_postsList}>
                    <div className={Styles.newsList_img}>
                        <img src={`./images/News/${newsList_imgs}`} alt="" style={{ height: '300px', width: '330px', borderRadius: '20px 0 0 20px' }} />
                    </div>

                    <div className={Styles.newsList_inf}>
                        <div className={Styles.newsList_date}>
                            {news_date}
                        </div>
                        <div className={Styles.newsList_name}>
                            {news_name}
                        </div>
                        <div className={Styles.newsList_des}>
                            <p>{news_des}</p>
                        </div>
                        <div className={Styles.newsList_btn}>
                            <button className={Styles.btn_seeMore}><Link to="/DetailNewsPage">See more <FaAngleRight /></Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
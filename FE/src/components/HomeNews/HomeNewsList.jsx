import React from 'react'
import Styles from './HomeNewsList.module.css'
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function HomeNewsList({news}) {
    const navigate = useNavigate();
    const date = new Date(news.updatedAt);
    const time = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() 
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
  return (
    <>
    <div className={Styles.container}>
        <div className={Styles.newsImage}>
            <img src={`http://localhost:3000/news/image/${news.image}`}  alt=""/>
        </div>
        <div className={Styles.newsContext}>
            <div className={Styles.newsDate}>
                <p>{time}</p>
            </div>

            <div className={Styles.newsTitle}>
                <p>{news.Title}</p>
            </div>

            <div className={Styles.newsDes}>
                <p>{news.Content}</p>
            </div>

            <div className={Styles.newsBtn}>
                <button className={Styles.btn_seeMore} onClick={()=>{navigate(`/DetailNewsPage/${news.News_id}`)}}>See more <FaAngleRight/></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default HomeNewsList
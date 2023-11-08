import React from 'react'
import Styles from './HomeNewsList.module.css'
import { FaAngleRight } from "react-icons/fa";
function HomeNewsList(
    {
        img_newsImage = 'newsImage_1.jpg', 
        date = '08/10/2023',
        title = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum magnam suscipit labore accusantium nulla animi, consequuntur, eveniet eos voluptates aspernatur, dicta at blanditiis natus saepe sunt ipsam tenetur harum eius.',
        description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum magnam suscipit labore accusantium nulla animi, consequuntur, eveniet eos voluptates aspernatur, dicta at blanditiis natus saepe sunt ipsam tenetur harum eius.',
        btn_seeMore = 'See more'
    }
) {
  return (
    <>
    <div className={Styles.container}>
        <div className={Styles.newsImage}>
            <img src={`./images/News/${img_newsImage}`}  alt=""/>
        </div>
        <div className={Styles.newsContext}>
            <div className={Styles.newsDate}>
                <p>{date}</p>
            </div>

            <div className={Styles.newsTitle}>
                <p>{title}</p>
            </div>

            <div className={Styles.newsDes}>
                <p>{description}</p>
            </div>

            <div className={Styles.newsBtn}>
                <button className={Styles.btn_seeMore}>See more <FaAngleRight/></button>
            </div>
        </div>
    </div>
    </>
  )
}

export default HomeNewsList
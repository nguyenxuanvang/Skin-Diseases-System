import React from 'react'
import Styles from './NewsPage.module.css'
function NewsBanner(
    {
        newsBanner_img = "NewsBanner.png",
        news_Title = "Tin tức hằng ngày"
    }
) {
  return (
    <div className={Styles.news_header}>
    <img src={`/images/NewsBanner/${newsBanner_img}`} alt="" style={{height:'300px'}}/>

     <div className={Styles.news_Title}>
         {news_Title}
     </div>
 </div>
  )
}

export default NewsBanner
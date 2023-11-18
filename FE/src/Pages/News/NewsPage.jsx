import React from 'react'
import Styles from './NewsPage.module.css'
import NewsBanner from './NewsBanner'
import NewsList from './NewsList'
import NewsType from './NewsType'
import Footer from '../../components/Footer/Footer'
function NewsPage() {
  return (
    <>
      <div className={Styles.newsPage_banner}>
        <NewsBanner />
      </div>
      <div className={Styles.newsList_title}>Tin tức</div>
      <div className={Styles.newsPage_content}>
        <div className={Styles.newsPage_list}>
          <NewsList />
        </div>
        <div className={Styles.newsPage_type}>
          <NewsType />
        </div>
      </div>

      <div className={Styles.newsPage_footer}>
        <Footer />
      </div>
    </>
  )
}

export default NewsPage
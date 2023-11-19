import React, { useState, useEffect } from 'react';
import Styles from './NewsPage.module.css'
import NewsBanner from './NewsBanner'
import NewsList from './NewsList'
import NewsType from './NewsType'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
function NewsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <Header />
      </div>
      <Spin spinning={loading} size="large">
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
      </Spin>
    </>
  )
}

export default NewsPage
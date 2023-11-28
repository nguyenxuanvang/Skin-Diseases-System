import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Styles from './Home.module.css';
import HomeNewsList from '../../components/HomeNews/HomeNewsList';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import newsApi from '../../redux/api/news.slice';
function HomeNews() {
  const {data = {}} = newsApi.useGetListNewsQuery();
  return (
    <div className={Styles.home_news}>
      <div className={Styles.home_newsHeader}>
        <div className={Styles.home_newsTitle}>Tin tức</div>
        <div className={Styles.home_newsLatest}>Tin mới nhất</div>
      </div>
      <div className={Styles.home_newsLists}>
        {data.data?.map(item => (
          <HomeNewsList key={item.News_id} news={item}/>
        ))}
      </div>
    </div>
  );
}

export default HomeNews;
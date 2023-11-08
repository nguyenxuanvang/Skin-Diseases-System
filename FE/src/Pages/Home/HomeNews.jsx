import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Styles from './Home.module.css';
import HomeNewsList from '../../components/HomeNews/HomeNewsList';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomeNews() {
  return (
    <div className={Styles.home_news}>
      <div className={Styles.home_newsHeader}>
        <div className={Styles.home_newsTitle}>Tin tức</div>
        <div className={Styles.home_newsLatest}>Tin mới nhất</div>
      </div>
      <div className={Styles.home_newsLists}>
        <Swiper
          navigation
          pagination={{ clickable: true }}
          className={Styles.newsSwiper}
        >
          <SwiperSlide>
            <HomeNewsList
              img_newsImage="newsImage_2.jpg"
              title="Những căn bệnh da liễu thường gặp"
            />
            <HomeNewsList date="05/10/2023" />
            <HomeNewsList
              img_newsImage="newsImage_3.jpg"
              title="Cách phòng chống căn bệnh mẩn đỏ thường gặp ở Việt Nam"
            />
            <HomeNewsList />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HomeNews;
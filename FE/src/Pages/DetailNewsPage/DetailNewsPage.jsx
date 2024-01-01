import React, { useState, useEffect } from 'react';
import Styles from './DetailNewsPage.module.css'
import DetailNews from '../../components/DetailNews/DetailNews'
import NewsBanner from '../News/NewsBanner'
import NewsType from '../News/NewsType'
import Footer from '../../components/Footer/Footer'
import LatestNews from '../../components/LatestNews/LatestNews'
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
import newsApi from '../../redux/api/news.slice';
import questionApi from '../../redux/api/question.slice';
function DetailNewsPage() {
    const { id } = useParams();
    const {data: objQ = {}} = questionApi.useGetQuestionListQuery();
    const [getNews,{data = {}}] = newsApi.useLazyGetNewsQuery();
    useEffect(()=>{
        getNews(id);
    },[id]);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem('token')) {
            setIsLogin(true);
        }
    },[]);
    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                {(isLogin) ? <HeaderL/> : <Header/>}
            </div>
            
                <div><NewsBanner /></div>
                <div className={Styles.DetailNewsPage_content}>
                    <div className={Styles.DetailNewsPage_post}>
                        <DetailNews news={data.data} />
                    </div>

                    <div className={Styles.DetailNewsPage_type}>
                        <NewsType />

                        <div className={Styles.DetailNewsPage_latest}>
                            <div className={Styles.DetailNewsPage_latest_title}>Bài viết mới nhất</div>
                            <div className={Styles.DetailNewsPage_latest_list} style={{ margin: '10px 0 20px 20px' }}>
                                {objQ.data?.slice(0,5).map(item => (
                                    <LatestNews question={item}/>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className={Styles.DetailNewsPage_footer}>
                    <Footer />
                </div>
            
        </>
    )
}

export default DetailNewsPage
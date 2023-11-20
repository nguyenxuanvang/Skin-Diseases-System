import React, { useState, useEffect } from 'react';
import Styles from './DetailNewsPage.module.css'
import DetailNews from '../../components/DetailNews/DetailNews'
import NewsBanner from '../News/NewsBanner'
import NewsType from '../News/NewsType'
import Footer from '../../components/Footer/Footer'
import LatestNews from '../../components/LatestNews/LatestNews'
import { Spin } from 'antd';
import Header from '../../components/Header';
function DetailNewsPage() {
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
            <Spin spinning={loading} size="large" tip="SkinDiagnoTech..." >
                <div><NewsBanner /></div>
                <div className={Styles.DetailNewsPage_content}>
                    <div className={Styles.DetailNewsPage_post}>
                        <DetailNews />
                    </div>

                    <div className={Styles.DetailNewsPage_type}>
                        <NewsType />

                        <div className={Styles.DetailNewsPage_latest}>
                            <div className={Styles.DetailNewsPage_latest_title}>Bài viết mới nhất</div>
                            <div className={Styles.DetailNewsPage_latest_list} style={{ margin: '10px 0 20px 20px' }}>
                                <LatestNews />
                                <LatestNews />
                                <LatestNews />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={Styles.DetailNewsPage_footer}>
                    <Footer />
                </div>
            </Spin>
        </>
    )
}

export default DetailNewsPage
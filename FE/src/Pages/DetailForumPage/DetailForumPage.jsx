import React, { useState, useEffect } from 'react';
import DetailQuestion from '../../components/DetailQuestion'
import Styles from './DetailForumPage.module.css'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
function DetailForumPage() {

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
                <div className={Styles.detailForumPage_header}>
                    <img src="./images/NewsBanner/NewsBanner.png" alt="" style={{ height: '300px' }} />

                    <div className={Styles.detailForumPage_Title}>
                        Câu hỏi thường gặp
                    </div>
                </div>

                <div>
                    <DetailQuestion />
                </div>

                <div className='mt-5'>
                    <Footer />
                </div>
            </Spin>
        </>
    )
}

export default DetailForumPage
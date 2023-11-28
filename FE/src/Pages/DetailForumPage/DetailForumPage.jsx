import React, { useState, useEffect } from 'react';
import DetailQuestion from '../../components/DetailQuestion'
import Styles from './DetailForumPage.module.css'
import Footer from '../../components/Footer/Footer'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function DetailForumPage() {
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
            
                <div className={Styles.detailForumPage_header}>
                    <img src="/images/NewsBanner/NewsBanner.png" alt="" style={{ height: '300px' }} />

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
        </>
    )
}

export default DetailForumPage
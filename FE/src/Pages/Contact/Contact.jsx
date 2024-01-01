import React, { useState, useEffect } from 'react';
import Styles from './Contact.module.css'
import ContactBanner from './ContactBanner'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { Spin } from 'antd';
import Header from '../../components/Header';
import HeaderL from '../../components/HeaderL/Header';
function Contact() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
    }, []);

    return (
        <>
            <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
                {(isLogin) ? <HeaderL/> : <Header/>}
            </div>
            
                <div>
                    <ContactBanner />
                </div>

                <div className='text-center mt-5' style={{ width: '600px', height: '300px', border: '1px solid blue', borderRadius: '10px', margin: '0 auto' }}>

                    <div className='mt-5'>
                        <div className='list_contact'>
                            <h2>Liên Hệ Với Chúng Tôi</h2>
                        </div>

                        <div className='list_contact'>
                            <h4>Team C1SE.48</h4>
                        </div>

                        <div className='list_contact'>
                            <p>1111-2222-3333</p>
                        </div>

                        <div className='list_contact'>
                            <Link style={{ textDecoration: 'none' }}><p>cskh@SkinDiagnoTech.vn</p></Link>
                        </div>
                    </div>
                    <div className={Styles.contact_img}>
                        <img src="./images/ContactIcon/Contact_img_4.png" alt="" />
                    </div>

                </div>

                <div style={{ marginTop: 50 }}>
                    <Footer />
                </div>
        </>
    )
}

export default Contact
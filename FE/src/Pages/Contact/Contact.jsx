import React from 'react'
import Styles from './Contact.module.css'
import ContactBanner from './ContactBanner'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
function Contact() {
    return (
        <>
            <div>
                <ContactBanner />
            </div>

            <div className='text-center mt-5' style={{ width: '600px', height: '300px', border: '1px solid blue', borderRadius: '10px', margin: '0 auto' }}>

                <div className='mt-5'>
                    <div className='list_contact'>
                        <h2>Contact with us</h2>
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
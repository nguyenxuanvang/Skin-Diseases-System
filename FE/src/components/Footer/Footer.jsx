import React from 'react'
import Styles from './Footer.module.css'
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer({
    nameApp = 'SkinDiagnoTech',
    nameGoal = 'Đặt niềm tin lên hàng đầu.',
    phone = '1111-2222-3333',
    email = '123@gmail.com',
    address = 'Da Nang',
    copyright = '© 2023 SkinDiagnoTech’s name All Rights Reserved by Team C1SE.48'
}) {
    return (
        <>
            <div className={Styles.footer}>
                <div className={Styles.nameFooter}>
                    <p className={Styles.name_app}>{nameApp}</p>
                    <p className={Styles.name_goal}>{nameGoal}</p>
                </div>

                <div className={Styles.contactUs}>
                    <p>Liên Hệ Với Chúng Tôi</p>
                    <span className={Styles.fw_b}>Gọi: </span><span>{phone}</span><br />
                    <span className={Styles.fw_b}>Email:</span> <span>{email}</span><br />
                    <span className={Styles.fw_b}>Địa Chỉ:</span> <span>{address}</span>
                </div>
            </div>
            <div className={Styles.footer_copyright}>
                <p>{copyright}</p>

                <div className={Styles.social_network}>
                    <span className={Styles.list_social}><FaFacebook /></span>
                    <span className={Styles.list_social}><FaInstagram /></span>
                    <span className={Styles.list_social}><FaTwitter /></span>
                    <span className={Styles.list_social}><FaYoutube/></span>
                </div>
            </div>
        </>
    )
}

export default Footer
import React from 'react'
import Styles from './Home.module.css'
import { FaChevronRight } from "react-icons/fa";
import HomeIntroductionList from '../../components/HomeIntroduction/HomeIntroductionList';
function HomeIntroduction() {
  return (
    <>
    <div className={Styles.introduction_rectangle}></div>
    <div className={Styles.introduction_title}>Introduction</div>
    <div className={Styles.introdction_seeMore}>
        <a href="">See more<FaChevronRight/></a>
    </div>
    <div className={Styles.HomeIntroduction_List} style={{fontWeight:'bold'}}>
    <HomeIntroductionList boxcolor='red' text_des='Chào mừng đến với SkinDiagnoTech'/>
    <HomeIntroductionList boxcolor='Blue' text_des='SkinDiagnoTech cung cấp hệ thống chuẩn đoán bệnh da liễu thông qua hình ảnh và tạo ra một diễn đàn để mọi người cùng nhau giải đáp những thắc mắc.'/>
    <HomeIntroductionList text_des='Đặt sức khỏe của người bệnh lên hàng đầu'/>
    </div>
    </>
  )
}

export default HomeIntroduction
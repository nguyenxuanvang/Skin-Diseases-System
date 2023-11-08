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
    <div className={Styles.HomeIntroduction_List}>
    <HomeIntroductionList boxcolor='red' text_des='Context'/>
    <HomeIntroductionList boxcolor='Blue' text_des='Hello'/>
    <HomeIntroductionList/>
    </div>
    </>
  )
}

export default HomeIntroduction
import React from 'react'
import Styles from './Home.module.css'
import HomeSlider from './ImageSlider'
import HomeIntroduction from './HomeIntroduction'
import HomeDiagnose from './HomeDiagnose'
import HomeNews from './HomeNews'
import HomeDoctor from './HomeDoctor'
import HomeContact from './HomeContact'
import HomeFooter from './HomeFooter'
function Home() {
  return (
    <>
    <div className={Styles.home_Slider}>
      <HomeSlider/>
    </div>
    <div className={Styles.home_Introduction}>
      <HomeIntroduction/>
    </div>
    <div className={Styles.home_Diagnose}>
      <HomeDiagnose/>
    </div>

    <div className={Styles.home_News}>
      <HomeNews/>
    </div>

    <div className={Styles.home_Doctor}>
      <HomeDoctor/>
    </div>

    <div className={Styles.home_Contact}>
      <HomeContact/>
    </div>

    <div className={Styles.home_Contact}>
      <HomeFooter/>
    </div>
    </>
  )
}

export default Home
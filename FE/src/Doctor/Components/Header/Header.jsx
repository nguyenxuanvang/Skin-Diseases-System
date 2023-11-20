import React from 'react'
import { Link } from 'react-router-dom';
import { BsFillBellFill } from 'react-icons/bs'
import styles from './Header.module.css'
import { Spin } from 'antd';
function Header() {
  const [spinning, setSpinning] = React.useState(false);
  const showLoader1 = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 100);
  };
  return (
    <div className={styles.header}>
      <Spin spinning={spinning} fullscreen size="large" />
      <div className={styles.linkLeftColumn}>
        <Link to="/Home" onClick={showLoader1}>SkinDiagnoTech</Link>
      </div>
      <div className={styles.linkRightColumn}>
        <ul className={styles.navigation}>
          <li className={styles.link}>
            <Link to="/Introduction" onClick={showLoader1}>Introduction</Link>
          </li>
          <li className={styles.link}>
            <Link to="/Doctor" onClick={showLoader1}>Doctor</Link>
          </li>
          <li className={styles.link}>
            <Link to="/TestPage" onClick={showLoader1}>Test</Link>
          </li>
          <li className={styles.link}>
            <Link to="/NewsPage" onClick={showLoader1}>News</Link>
          </li>
          <li className={styles.link}>
            <Link to="/ForumPage" onClick={showLoader1}>Q&A</Link>
          </li>
          <li className={styles.link}>
            <Link to="/Contact" onClick={showLoader1}>Contact</Link>
          </li>
          <li className={styles.linkToLogin}>
            <div className={styles.avatar_question}>
              <Link to='/DoctorInformationPage' onClick={showLoader1}><img src="./images/Doctor/account_doctor.png" alt="" /></Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Header
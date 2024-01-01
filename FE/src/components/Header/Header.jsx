import React from 'react';
import { Link} from 'react-router-dom';
import styles from './Header.module.css'
function Header() {
  return (
    <>
    <div className={styles.header}>
        <div className={styles.linkLeftColumn}>
          <Link to="/Home" >SkinDiagnoTech</Link>
        </div>
        <div className={styles.linkRightColumn}>
          <ul className={styles.navigation}>
            <li className={styles.link}>
              <Link to="/Introduction" >Giới Thiệu</Link>
            </li>
            <li className={styles.link}>
              <Link to="/Doctor" >Bác Sĩ</Link>
            </li>
            <li className={styles.link}>
              <Link to="/TestPage">Chẩn Đoán</Link>
            </li>
            <li className={styles.link}>
              <Link to="/NewsPage" >Tin Tức</Link>
            </li>
            <li className={styles.link}>
              <Link to="/ForumPage" >Diễn Đàn</Link>
            </li>
            <li className={styles.link}>
              <Link to="/Contact" >Liên Hệ</Link>
            </li>
            <div className={styles.linkToLogin}>
              <button className={styles.formatToLogin}>
                <Link to="/Login" >Đăng Nhập</Link>
              </button>
            </div>
          </ul>
        </div>
      </div>
      </>
  )
}

export default Header
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
              <Link to="/Introduction" >Introduction</Link>
            </li>
            <li className={styles.link}>
              <Link to="/Doctor" >Doctor</Link>
            </li>
            <li className={styles.link}>
              <Link to="/TestPage">Test</Link>
            </li>
            <li className={styles.link}>
              <Link to="/NewsPage" >News</Link>
            </li>
            <li className={styles.link}>
              <Link to="/ForumPage" >Q&A</Link>
            </li>
            <li className={styles.link}>
              <Link to="/Contact" >Contact</Link>
            </li>
            <div className={styles.linkToLogin}>
              <button className={styles.formatToLogin}>
                <Link to="/Login" >Login</Link>
              </button>
            </div>
          </ul>
        </div>
      </div>
      </>
  )
}

export default Header
import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { BsFillBellFill } from "react-icons/bs";

function HeaderHome() {
  return (
    <div className={styles.header}>
      <div className={styles.linkLeftColumn}>
        <Link to="/">SkinDiagnoTech</Link>
      </div>
      <div className={styles.linkRightColumn}>
        <ul className={styles.navigation}>
          <li className={styles.link}>
            <Link to="/Introduction">Introduction</Link>
          </li>
          <li className={styles.link}>
            <Link to="/Doctor">Doctor</Link>
          </li>
          <li className={styles.link}>
            <Link to="/TestPage">Test</Link>
          </li>
          <li className={styles.link}>
            <Link to="/Introduction">Q&A</Link>
          </li>
          <li className={styles.link}>
            <Link to="/">Contact</Link>
          </li>
          <li className={styles.link}>
            <div className={styles.bell_Icon}>
              <BsFillBellFill />
            </div>
          </li>
          <div className={styles.linkToMakeappointment}>
            <button className={styles.formatToMakeappointment}>
              <Link to="/Introduction">Make an appointment</Link>
            </button>
          </div>

          <div className={styles.linkToLogin}>
            <button className={styles.formatToLogin}>
              <Link to="/Login">Login</Link>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HeaderHome;

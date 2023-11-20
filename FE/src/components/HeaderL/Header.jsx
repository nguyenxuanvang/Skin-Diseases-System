import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsFillBellFill } from 'react-icons/bs'
import styles from './Header.module.css'
import { Spin } from 'antd';
import doctorApi from '../../redux/api/doctor.slice';
function HeaderL() {
  const {data = {}} = doctorApi.useGetDetailDoctorQuery();
  const [doctor, setDoctor] = useState({});
  useEffect(()=>{
    setDoctor(data.user);
  },[data]);
  return (
    <div className={styles.header}>
      <div className={styles.linkLeftColumn}>
        <Link to="/Home">SkinDiagnoTech</Link>
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
            <Link to="/NewsPage">News</Link>
          </li>
          <li className={styles.link}>
            <Link to="/ForumPage">Q&A</Link>
          </li>
          <li className={styles.link}>
            <Link to="/Contact">Contact</Link>
          </li>
          <li className={styles.linkToLogin}>
            <div className={styles.avatar_question}>
              <Link to={(doctor) ? (doctor.role === 'doctor') ? '/DoctorInformationPage' : '/UserInformationPage' : ''}>
                {(doctor) ? <img src={`http://localhost:3000/detail/image/${doctor.avatar}`} alt="" /> : ''}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default HeaderL
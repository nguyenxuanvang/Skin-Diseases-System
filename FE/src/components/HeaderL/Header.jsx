import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsFillBellFill } from 'react-icons/bs'
import styles from './Header.module.css'
import { Spin } from 'antd';
import personalApi from '../../redux/api/personal.slice';
import { useNavigate } from "react-router-dom";
function HeaderL() {
  const {data = {}, isError, isFetching} = personalApi.useGetDetailInforQuery();
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isFetching) {
      setCheck(true);
    }
  },[isFetching]);
  useEffect(()=>{
    if(check) {
      if(isError) {
        localStorage.removeItem('token');
        navigate("/login");
      }
    }
  },[isError]);

  if(data.user?.role === 'admin') {
    navigate("/menu-list");
  }

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
              <Link to={(data.user?.role === 'doctor') ? '/DoctorInformationPage' : '/UserInformationPage' }>
                {<img style={{border: (data.user?.approved) ? '4px solid #12d212' : '4px solid #4070F4'}} src={`http://localhost:3000/detail/image/${data.user?.avatar}`} alt="" />}
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default HeaderL
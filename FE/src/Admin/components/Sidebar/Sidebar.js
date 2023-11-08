import React from 'react'
import Styles from './Sidebar.module.css'
import { Link } from 'react-router-dom';

function Sidebar({ username, onLogout }) {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.menu}>
        <h2><Link to="/menu-list">MenuList</Link></h2>
        <ul>
          <li className={Styles.list_menu}>
            <Link to="/doctor-management">Doctor Management</Link>
          </li>
          <div className={Styles.white_rect}></div>
          <li className={Styles.list_menu}>
            <Link to="/news-management">News Management</Link>
          </li>
          <div className={Styles.white_rect}></div>
        </ul>
      </div>
      <div className={Styles.user_info}>
        <p>Welcome, {username}</p>
        <button className={Styles.btn_logout} onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
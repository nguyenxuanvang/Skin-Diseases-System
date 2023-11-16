import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AiOutlineSolution, AiOutlineBarChart, AiOutlineSnippets  } from "react-icons/ai";
import Styles from './Sidebar.module.css'

const Sidebar = (
) => {
  return (
    <div style={{height:'100vh', position:'fixed'}}>
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{ width:'300px', height: '100%' }}
      >
        <Menu.Item key="1" icon={<AiOutlineBarChart />}>
          <Link to="/menu-list" style={{fontSize:20}}>Dashboard</Link>
        </Menu.Item>

        <Menu.SubMenu key="sub1" icon={<AiOutlineSolution />} title="Doctor" style={{fontSize:20}}>
          <Menu.Item key="2">
            <Link to="/doctor-management" style={{fontSize:15}}>List Doctor</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets />} title="News" style={{fontSize:20}}>
          <Menu.Item key="3">
            <Link to="/news-management" style={{fontSize:15}}>List News</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/add-news" style={{fontSize:15}}>Add News</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub3" icon={<AiOutlineSolution />} title="Q&A" style={{fontSize:20}}>
          <Menu.Item key="5">
            <Link to="/doctor-management" style={{fontSize:15}}>List Q&A</Link>
          </Menu.Item>

        </Menu.SubMenu>
      </Menu>

      <div className={Styles.user_info}>
        <p style={{color:'white', padding:'0 20px'}}>Welcome, Tuan</p>
        <button className={Styles.btn_logout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;

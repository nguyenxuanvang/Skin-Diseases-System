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
        <Menu.Item key="1" icon={<AiOutlineBarChart style={{fontSize:20, color:'white'}}/>}>
          <Link to="/menu-list" style={{fontSize:20, color:'white'}}>Dashboard</Link>
        </Menu.Item>

        <Menu.SubMenu key="sub1" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title="Doctor" style={{fontSize:20, color:'white'}}>         
          <Menu.Item key="2">
            <Link to="/doctor-management" style={{fontSize:15, color:'white'}}>List Doctor</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets style={{fontSize:20, color:'white'}}/>} title="News" style={{fontSize:20}}>
          <Menu.Item key="3">
            <Link to="/news-management" style={{fontSize:15, color:'white'}}>List News</Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/add-news" style={{fontSize:15, color:'white'}}>Add News</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub3" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title="Q&A" style={{fontSize:20, color:'white'}}>
          <Menu.Item key="5">
            <Link to="/doctor-management" style={{fontSize:15, color:'white'}}>List Q&A</Link>
          </Menu.Item>

        </Menu.SubMenu>
      </Menu>

      <div className={Styles.user_info}>
        <p style={{color:'white', padding:'0 20px'}}>Welcome, Tuan</p>
        <button className={Styles.btn_logout}><Link to="/Login" style={{textDecoration:'none'}}>Logout</Link></button>
      </div>
    </div>
  );
};

export default Sidebar;

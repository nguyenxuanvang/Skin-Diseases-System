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
          style={{ width:'300px', height: '100%' }}
      >
        <Menu.SubMenu key="sub1" icon={<AiOutlineSolution />} title="Profile" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="2">
            <Link to="/DetailUserInformation" style={{fontSize:15, color:'black'}}>Personal Information</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/EditInformationPage" style={{fontSize:15, color:'black'}}>Edit</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets />} title="Account" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="4">
            <Link to="/UserAccountPage" style={{fontSize:15, color:'black'}}>UserName and Password</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets />} title="History QA" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="4">
            <Link to="/HistoryUserQAPage" style={{fontSize:15, color:'black'}}>History</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AiOutlineSolution, AiOutlineBarChart, AiOutlineSnippets  } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Styles from './Sidebar.module.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div style={{height:'100vh', position:'fixed'}}>
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"     
          style={{ width:'300px', height: '100%' }}
      >
        <Menu.SubMenu key="sub1" icon={<AiOutlineSolution />} title="Hồ Sơ" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="2">
            <Link to="/DetailUserInformation" style={{fontSize:15, color:'black'}}>Thông Tin Cá Nhân</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/UserEditInformationPage" style={{fontSize:15, color:'black'}}>Cập Nhật Thông Tin</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets />} title="Tài Khoản" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="4">
            <Link to="/UserAccountPage" style={{fontSize:15, color:'black'}}>Email Và Mật Khẩu</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSnippets />} title="Lịch Sử" style={{fontSize:20, color:'black'}}>
          <Menu.Item key="4">
            <Link to="/HistoryUserQAPage" style={{fontSize:15, color:'black'}}>Bài Viết</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <div style={{display:'flex',justifyContent:'center',marginTop: '15px'}}>
          <button onClick={logout}>Đăng Xuất</button>
        </div>
      </Menu>
    </div>
  );
};

export default Sidebar;

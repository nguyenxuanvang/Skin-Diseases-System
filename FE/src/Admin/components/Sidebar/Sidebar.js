import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AiOutlineSolution, AiOutlineBarChart, AiOutlineSnippets  } from "react-icons/ai";
import personalApi from '../../../redux/api/personal.slice';
import Styles from './Sidebar.module.css';
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const {data = {}} = personalApi.useGetDetailInforQuery();
  const navigate = useNavigate();
  if(data.user?.role === 'doctor' || data.user?.role === 'user') {
    navigate("/home");
  }
  useEffect(()=>{
    if(!localStorage.getItem('token')) {
      navigate("/home");
    }
  },[]);
  const logOut = () => {
    localStorage.removeItem('token');
  }
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
        
        <Menu.SubMenu key="sub1" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title={<span style={{color: 'white'}}>Bác Sĩ</span>} style={{fontSize:20, color:'white'}}>         
          <Menu.Item key="2">
            <Link to="/doctor-management" style={{fontSize:15, color:'white'}}>Danh Sách Bác Sĩ</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub2" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title={<span style={{color: 'white'}}>Người Dùng</span>} style={{fontSize:20, color:'white'}}>         
          <Menu.Item key="3">
            <Link to="/user-management" style={{fontSize:15, color:'white'}}>Danh Sách Người Dùng</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub3" icon={<AiOutlineSnippets style={{fontSize:20, color:'white'}}/>} title={<span style={{color: 'white'}}>Tin Tức</span>} style={{fontSize:20}}>
          <Menu.Item key="4">
            <Link to="/news-management" style={{fontSize:15, color:'white'}}>Danh Sách Tin Tức</Link>
          </Menu.Item>

          <Menu.Item key="5">
            <Link to="/add-news" style={{fontSize:15, color:'white'}}>Tạo Mới Tin Tức</Link>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="sub4" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title={<span style={{color: 'white'}}>Bài Đăng</span>} style={{fontSize:20, color:'white'}}>
          <Menu.Item key="6">
            <Link to="/QAManagementPage" style={{fontSize:15, color:'white'}}>Danh Sách Bài Đăng</Link>
          </Menu.Item>

        </Menu.SubMenu>
        <Menu.SubMenu key="sub5" icon={<AiOutlineSolution style={{fontSize:20, color:'white'}}/>} title={<span style={{color: 'white'}}>Duyệt Bác Sĩ</span>} style={{fontSize:20, color:'white'}}>
          <Menu.Item key="">
            <Link to="/ApprovalPage" style={{fontSize:15, color:'white'}}>Danh Sách Yêu Cầu</Link>
          </Menu.Item>

        </Menu.SubMenu>
      </Menu>

      <div className={Styles.user_info}>
        <p style={{color:'white', padding:'0 20px'}}>Xin Chào, {data.user?.name}</p>
        <button onClick={logOut} className={Styles.btn_logout}><Link to="/Login" style={{textDecoration:'none'}}>Thoát</Link></button>
      </div>
    </div>
  );
};

export default Sidebar;

import React from 'react'
import Style from './DetailUserInformation.module.css'
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import { FaPhoneAlt, FaAddressCard, FaMailBulk } from "react-icons/fa";
import { Spin } from 'antd';
import HeaderL from '../../../components/HeaderL/Header';
import personalApi from '../../../redux/api/personal.slice';
function DetailUserInformation() {
  const {data = {}} = personalApi.useGetDetailInforQuery();
  const [user, setUser] = useState({});
  useEffect(()=>{
    setUser(data?.user);
  },[data?.user])
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <HeaderL />
      </div>
      <div className={Style.detailUserInformation_sidebar}>
        <Sidebar />
      </div>
      <div className='d-flex' style={{ marginLeft: '350px' }}>
        {(user) ?
        <div className={Style.detailUserInformation_avatar}>
          <img src={`http://localhost:3000/detail/image/${user.avatar}`} alt="" />
        </div> : 
        <div className={Style.detailUserInformation_avatar}>
          <img src="" alt="" />
        </div>
        }

        <div className={Style.detailUserInformation_des}>
          {(!user) ?
            <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
              <Spin spinning={true} size="large" tip="SkinDiagnoTech..." ></Spin>
            </div> :
            <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
              <h3>{(user.name) ? user.name : "Chưa Cập Nhật"}</h3>
              <p><FaPhoneAlt />  {(user.phone) ? user.phone : "Chưa Cập Nhật"}</p>
              <p><FaAddressCard /> {(user.address) ? user.address : "Chưa Cập Nhật"}</p>
              <p><FaMailBulk /> {(user.email) ? user.email : "Chưa Cập Nhật"}</p>
            </div>  
          }
          
        </div>
      </div>

    </>
  )
}

export default DetailUserInformation
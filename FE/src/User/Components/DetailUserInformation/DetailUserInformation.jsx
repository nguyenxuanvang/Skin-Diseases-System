import React from 'react'
import Style from './DetailUserInformation.module.css'
import Sidebar from '../Sidebar/Sidebar'
import { FaPhoneAlt, FaAddressCard, FaMailBulk } from "react-icons/fa";
import Header from '../Header';
function DetailUserInformation(
  {
    user = 'Tên user',
    user_phone = '0987654321',
    user_address = 'Da Nang',
    user_mail = '123@gmail.com'
  }
) {
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <Header />
      </div>
      <div className={Style.detailUserInformation_sidebar}>
        <Sidebar />
      </div>
      <div className='d-flex' style={{ marginLeft: '350px' }}>
        <div className={Style.detailUserInformation_avatar}>
          <img src="./images/Login/user_default.png" alt="" />
        </div>

        <div className={Style.detailUserInformation_des}>
          <div className='business_card' style={{ padding: '20px 0 0 20px', fontWeight: 'bold' }}>
            <h3>{user}</h3>
            <p><FaPhoneAlt />  {user_phone}</p>
            <p><FaAddressCard /> {user_address}</p>
            <p><FaMailBulk /> {user_mail}</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default DetailUserInformation
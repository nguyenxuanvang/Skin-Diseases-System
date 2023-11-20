import React, { useEffect, useState } from 'react';
import Style from './DetailDoctorInformation.module.css';
import {BsFillInfoCircleFill, BsFillBagPlusFill, BsHospitalFill, BsBookFill}from "react-icons/bs";
import doctorApi from '../../../redux/api/doctor.slice';
function DoctorCareer() {
  const {data = {}} = doctorApi.useGetDetailDoctorQuery();
  const [doctor, setDoctor] = useState({});
  const [activeTab, setActiveTab] = useState('pills-home');
  
  useEffect(()=>{
    setDoctor(data.user);
  },[data]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div style={{width:'90%'}}>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button style={{width:'200px'}}
            className={`nav-link ${activeTab === 'pills-introduction' ? 'active' : ''}`}
            onClick={() => handleTabClick('pills-introduction')}
          >
            <BsFillInfoCircleFill/><span> Introduction </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button style={{width:'200px'}}
            className={`nav-link ${activeTab === 'pills-role' ? 'active' : ''}`}
            onClick={() => handleTabClick('pills-role')}
          >
            <BsFillBagPlusFill/><span> Role </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button style={{width:'200px'}}
            className={`nav-link ${activeTab === 'pills-address' ? 'active' : ''}`}
            onClick={() => handleTabClick('pills-address')}
          >
            <BsHospitalFill/><span> Work Address </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button style={{width:'200px'}}
            className={`nav-link ${activeTab === 'pills-experience' ? 'active' : ''}`}
            onClick={() => handleTabClick('pills-experience')}
          >
            <BsBookFill/><span> Experience </span>
          </button>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className={`tab-pane fade show ${activeTab === 'pills-introduction' ? 'active' : ''}`}
          id="pills-introduction"
          role="tabpanel"
        >
          {(doctor) ? (doctor.introduce) ? doctor.introduce : "Chưa Cập Nhật": ""}
        </div>
        <div
          className={`tab-pane fade ${activeTab === 'pills-role' ? 'show active' : ''}`}
          id="pills-role"
          role="tabpanel"
        >
          {(doctor) ? (doctor.position) ? doctor.position : "Chưa Cập Nhật" : ""}
        </div>
        <div
          className={`tab-pane fade ${activeTab === 'pills-address' ? 'show active' : ''}`}
          id="pills-address"
          role="tabpanel"
        >
          {(doctor) ? (doctor.work_address) ? doctor.work_address : "Chưa Cập Nhật" : ""}
        </div>

        <div
          className={`tab-pane fade ${activeTab === 'pills-experience' ? 'show active' : ''}`}
          id="pills-experience"
          role="tabpanel"
        >
          {(doctor) ? (doctor.experience) ? doctor.experience : "Chưa Cập Nhật" : ""}
        </div>
      </div>
    </div>
  );
}

export default DoctorCareer;

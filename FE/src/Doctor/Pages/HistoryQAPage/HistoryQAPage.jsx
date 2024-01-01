import React, { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Style from './HistoryQAPage.module.css'
import QAquestionDoctor from '../../Components/Q&AquestionDoctor/QAquestionDoctor'
import HeaderL from '../../../components/HeaderL/Header'
import personalApi from '../../../redux/api/personal.slice'
function HistoryQAPage() {
  const {data = {}} = personalApi.useGetOwnQuestionsQuery();
  const {data: info = {}} = personalApi.useGetDetailInforQuery();
  const [list, setList] = useState([]);
  useEffect(()=>{
    setList(data.data);
  },[data.data]);
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <HeaderL />
      </div>
      <div className={Style.historyQAPage_sidebar}>
        <Sidebar />
      </div>
      <div style={{ marginLeft: '350px' }}>
        <div style={{ padding: '50px 0 0 50px' }}>
          <h2>Lịch Sử Bài Viết Cá Nhân</h2>
        </div>
        {(list?.length > 0) ? list.map(item => (
          <QAquestionDoctor key={item.Question_id} info={info} item={item} />
        )): <div
              style={{
                textAlign: 'center',
                fontSize: '30px',
                color: 'red',
                fontWeight: '600',
                marginTop: '150px',
              }} 
            >Chưa Có Bài Đăng Nào</div>}
        
      </div>
    </>
  )
}

export default HistoryQAPage
import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Style from './HistoryQAPage.module.css'
import QAquestionUser from '../../Components/Q&AquestionUser/QAquestionUser'
import Header from '../../../Doctor/Components/Header'
function HistoryUserQAPage() {
  return (
    <>
      <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
        <Header />
      </div>
      <div className={Style.historyQAPage_sidebar}>
        <Sidebar />
      </div>
      <div style={{ marginLeft: '350px' }}>
        <div style={{ padding: '50px 0 0 50px' }}>
          <h2>History Q&A</h2>
        </div>
        <QAquestionUser />
        <QAquestionUser />
        <QAquestionUser />
        <QAquestionUser />
        <QAquestionUser />
      </div>
    </>
  )
}

export default HistoryUserQAPage
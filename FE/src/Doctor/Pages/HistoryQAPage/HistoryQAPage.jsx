import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Style from './HistoryQAPage.module.css'
import QAquestionDoctor from '../../Components/Q&AquestionDoctor/QAquestionDoctor'
import HeaderL from '../../../components/HeaderL/Header'
function HistoryQAPage() {
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
          <h2>History Q&A</h2>
        </div>
        <QAquestionDoctor />
        <QAquestionDoctor />
        <QAquestionDoctor />
        <QAquestionDoctor />
        <QAquestionDoctor />
      </div>
    </>
  )
}

export default HistoryQAPage
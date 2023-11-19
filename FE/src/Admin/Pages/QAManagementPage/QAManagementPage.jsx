import React from 'react'
import Styles from './QAManagementPage.module.css'
import QAManagement from '../../components/QAManagement'
import Sidebar from '../../components/Sidebar/Sidebar'
function QAManagementPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.qaManagementPage_overview}>
        <QAManagement />
      </div>
    </>
  )
}

export default QAManagementPage
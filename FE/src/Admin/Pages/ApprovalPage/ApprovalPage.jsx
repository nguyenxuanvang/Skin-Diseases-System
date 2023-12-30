import React from 'react'
import Styles from './ApprovalPage.module.css'
import Approval from '../../components/Approval'
import Sidebar from '../../components/Sidebar/Sidebar'
function ApprovalPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.approvalPage_overview}>
        <Approval />
      </div>
    </>
  )
}

export default ApprovalPage
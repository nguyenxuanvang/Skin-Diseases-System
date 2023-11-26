import React from 'react'
import Styles from './UserManagementPage.module.css'
import UserManagement from '../../components/UserManagement/UserManagement'
import Sidebar from '../../components/Sidebar/Sidebar'
function UserManagementPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.userManagement_overview}>
        <UserManagement/>
      </div>
    </>
  )
}

export default UserManagementPage
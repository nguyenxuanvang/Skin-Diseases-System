import React from 'react'
import Styles from './NewsManagementPage.module.css'
import NewsManagement from '../../components/NewsManagement'
import Sidebar from '../../components/Sidebar/Sidebar'
function NewsManagementPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.newsManagement_overview}>
        <NewsManagement />
      </div>
    </>

  )
}

export default NewsManagementPage
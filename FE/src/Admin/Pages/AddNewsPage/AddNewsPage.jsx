import React from 'react'
import Styles from './AddNewsPage.module.css'
import AddNews from '../../components/AddNews'
import Sidebar from '../../components/Sidebar/Sidebar'
function AddNewsPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.addNewsPage_overview}>
        <AddNews />
      </div>
    </>
  )
}

export default AddNewsPage
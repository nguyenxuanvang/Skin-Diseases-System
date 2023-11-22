import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import DetailUserInformation from '../../Components/DetailUserInformation'
import HeaderL from '../../../components/HeaderL/Header'
function UserInformationPage() {
    return (
        <>
        <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
          <HeaderL />
        </div>
        <div>
            <div><Sidebar/></div>
            <div><DetailUserInformation /></div>
        </div>
        </>
    )
}

export default UserInformationPage
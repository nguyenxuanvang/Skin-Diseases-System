import React from 'react'
import Styles from './Home.module.css'
import HomeContactList from '../../components/HomeContact/HomeContactList'
function HomeContact() {
    return (
        <>
            <div className={Styles.contact_title}>Contact</div>
            <div className={Styles.contact_list}>
                <HomeContactList />
                <HomeContactList contactIcon='Contact_icon_location.png' contactTitle='LOCATION' contactDes='Da Nang' />
                <HomeContactList contactIcon='Contact_icon_email.png' contactTitle='EMAIL' contactDes='123@gmail.com' />
                <HomeContactList contactIcon='Contact_icon_hour.png' contactTitle='WORKING HOUR' contactDes='Mon - Sat 09h - 20h' />
            </div>
        </>
    )
}

export default HomeContact
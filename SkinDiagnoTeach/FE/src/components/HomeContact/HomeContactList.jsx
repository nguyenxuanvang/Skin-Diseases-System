import React from 'react'
import Styles from './HomeContactList.module.css'
function HomeContactList({
    contactIcon = 'Contact_icon_phone.png',
    contactTitle = 'EMEMERGENCY',
    contactDes = '1111-2222-3333'
}) {
    return (
        <>
            <div className={Styles.HomeContactList}>
                <div className={Styles.ListContact}>
                    <div className={Styles.ContactIcon}>
                        <img src={`./images/ContactIcon/${contactIcon}`} alt="" />
                    </div>

                    <div className={Styles.ContactTitle}>
                        <p>{contactTitle}</p>
                    </div>

                    <div className={Styles.ContactDes}>
                        <p>{contactDes}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeContactList
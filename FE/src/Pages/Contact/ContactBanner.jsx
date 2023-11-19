import React from 'react'
import Styles from './Contact.module.css'
function ContactBanner(
{
    contactBanner_img = "contactbanner.png",
    contact_Title = "Liên hệ"
}) {
  return (
    <div className={Styles.contactBanner_header}>
       <img src={`./images/ContactIcon/${contactBanner_img}`} alt="" />

        <div className={Styles.contactBanner_title}>
            {contact_Title}
        </div>
    </div>
  )
}

export default ContactBanner
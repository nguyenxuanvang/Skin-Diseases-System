import React from 'react'
import RegisterForm from './RegisterForm'
import Styles from './Register.module.css'
function Register() {
    return (
        <>
            <div className={Styles.container}>
                <RegisterForm />
                <div className={Styles.image}>
                    <img src='./images/Login/image.png' alt=''/>
                </div>
            </div>
        </>
    )
}

export default Register
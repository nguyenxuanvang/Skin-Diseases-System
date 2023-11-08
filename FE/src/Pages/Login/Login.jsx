import React from 'react'
import LoginForm from './Loginform'
import Styles from './Login.module.css'
function Login() {
    return (
        <>
            <div className={Styles.container}>
                <LoginForm />
                <div className={Styles.image}>
                    <img src='./images/Login/image.png' alt=''/>
                </div>
            </div>
        </>
    )

}

export default Login
import React from 'react'
import LoginForm from './Loginform'
import Header from '../../components/Header'
function Login() {
    return (
        <>
            <Header/>
            <div className="container">
                <LoginForm />
                <div className="image">
                    <img src='./images/Login/image.png' alt=''/>
                </div>
            </div>
        </>
    )

}

export default Login
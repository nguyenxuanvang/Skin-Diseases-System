import React from 'react'
import RegisterForm from './RegisterForm'
import Header from '../../components/Header'
function Register() {
    return (
        <>
            <Header/>
            <div className="container">
                <RegisterForm />
                <div className="image">
                    <img src='./images/Login/image.png' alt=''/>
                </div>
            </div>
        </>
    )
}

export default Register
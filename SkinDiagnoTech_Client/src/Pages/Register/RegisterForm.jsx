import React from 'react'
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Styles from './Register.module.css'
function RegisterForm() {
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const onClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const onClickShowConfirmPassword = () => {
        setShowConfirmPass(!showConfirmPass);
    }

    return (
        <div className={Styles.form}>
            <div>
                <div>
                    <div className={Styles.title}>
                        Sign up
                    </div>
                    <div className={Styles.des}>
                        If you already have an account register
                    </div>
                    <div>
                        <div className={Styles.link}>
                            You can &nbsp;
                            <Link to="/login">Login here !</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <form>
                        <div className={Styles.group}>
                            <label for='email'>Email</label>
                            <br></br>
                            <input type='email' id='email' placeholder='Enter your email address'></input>
                            <div className='icon'>
                            </div>
                        </div>
                        <div className={Styles.group}>
                            <label for='username'>Username</label>
                            <br></br>
                            <input type='text' id='username' placeholder='Enter your User name'></input>
                            <div className={Styles.icon}>

                            </div>
                        </div>
                        <div className={Styles.group}>
                            <label for='password'>Password</label>
                            <br></br>
                            <input type={showPass ? 'text' : 'password'} id='password' placeholder='Enter your Password'></input>
                            <div className='icon'>
                            </div>
                            <div className='showPassword'>
                                <i class={showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={onClickShowPassword}></i>
                            </div>
                        </div>
                        <div className={Styles.group}>
                            <label for='confrimpass'>Confrim Password</label>
                            <br></br>
                            <input type={showConfirmPass ? 'text' : 'password'} id='confrimpass' placeholder='Confrim your Password'></input>
                            <div className={Styles.icon}>
                            </div>
                            <div className={Styles.showPassword}>
                                <i class={showConfirmPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={onClickShowConfirmPassword}></i>
                            </div>
                        </div>
                        <div>
                            <button className={Styles.button}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm
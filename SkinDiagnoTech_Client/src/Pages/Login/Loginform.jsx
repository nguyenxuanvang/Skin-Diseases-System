import {useState} from 'react';
import {Link} from 'react-router-dom';
import Styles from './Login.module.css'
const LoginForm = () => {
    const [show, setShow] = useState(false);

    const onClickShowPassword = () => {
        setShow(!show);
    }

    return (
        <div className={Styles.form}>
            <div>
                <div>
                    <div className={Styles.title}>
                        Login
                    </div>
                    <div className={Styles.des}>
                        If you don’t have an account register
                    </div>
                    <div>
                        <div className={Styles.link}>
                            You can &nbsp;
                            <Link to="/Register">Register here !</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <form>
                        <div className={Styles.group}>
                            <label for='email'>Email</label>
                            <br></br>
                            <input type='email' id={Styles.email} placeholder='Enter your email address'></input>
                            <div className={Styles.icon}>

                            </div>
                        </div>
                        <div className={Styles.group}>
                            <label for='password'>Password</label>
                            <br></br>
                            <input type={show ? 'text' : 'password'} id={Styles.password} placeholder='Enter your Password'></input>
                            <div className={Styles.icon} style={{top: '34px'}}>
                             
                            </div>
                            <div className={Styles.showPassword}>
                                <i class={show ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={onClickShowPassword}></i>
                            </div>
                        </div>
                        <div className={Styles.flex_row}>
                            <div className={Styles.flex_row}>
                                <div className={Styles.cbRemember}>
                                    <input type='checkbox'></input>
                                </div>
                                <div className={Styles.remember}>Remember me</div>
                            </div>
                            <div className={Styles.forgotPassword}>
                                Forgot Password ?
                            </div>
                        </div>
                        <div>
                            <button className={Styles.button}>Login</button>
                        </div>
                    </form>
                </div>
                {/* <div>
                    <div className={Styles.continue}>
                        or continue with
                    </div>
                    <div className={Styles.google}>
                        <button className='btn-gg'>Sign in with Google</button>
                        <div className={Styles.icon}>
                            <img src='./images/Login/google.png' alt=''/>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default LoginForm;
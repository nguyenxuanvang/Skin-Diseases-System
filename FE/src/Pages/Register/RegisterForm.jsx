import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signUpService } from "../../services/author/auth.service";
import '../Register/Register.css'
function RegisterForm() {
  const navigate = useNavigate();
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const onClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handChangeSignUpPayLoad = (event) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      [event.target.name]: event.target.value,
    });
  };

  const [signUpPayLoad, setSignUpPayLoad] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onClickShowConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleRegister = async () => {
    try {
      if (confirmPassword === password) {
        const response = await signUpService(signUpPayLoad);
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          navigate("/Login");
        }, [1000]);
      } else {
        toast.error("Password not match");
      }
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const { email, username, password, confirmPassword } = signUpPayLoad;

  return (
    <div className="form">
      <div>
        <div>
          <div className="title">Sign up</div>
          <div className="des">
            If you already have an account register
          </div>
          <div>
            <div className="link">
              You can &nbsp;
              <Link to="/Login">Login here !</Link>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="group">
              <label for="email">Email</label>
              <br></br>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={handChangeSignUpPayLoad}
              ></input>
              <div className="icon">
                <img src='/images/Login/email.png' alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
            </div>
            <div className="group">
              <label for="username">Username</label>
              <br></br>
              <input
                type="text"
                id="username"
                placeholder="Enter your User name"
                name="username"
                value={username}
                onChange={handChangeSignUpPayLoad}
              ></input>
              <div className="icon">
                <img src='/images/Login/user.png' alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
            </div>
            <div className="group">
              <label for="password">Password</label>
              <br></br>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={handChangeSignUpPayLoad}
              ></input>
              <div className="icon">
                <img src='/images/Login/lock.png' alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
              <div className="showPassword">
                <i
                  class={showPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                  onClick={onClickShowPassword}
                ></i>
              </div>
            </div>
            <div className="group">
              <label for="confirmpass">Confirm Password</label>
              <br></br>
              <input
                type="password"
                id="confirmpass"
                placeholder="Confirm your Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handChangeSignUpPayLoad}
              ></input>
              <div className="icon">
                <img src='/images/Login/lock.png' alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
              <div className="showPassword">
                <i
                  class={
                    showConfirmPass
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={onClickShowConfirmPassword}
                ></i>
              </div>
            </div>
            <div className="flex-row" id="rememberRegister">
                <div className="cbRemember">
                  <input type="checkbox"></input>
                </div>
                <div className="remember">You are a Doctor?</div>
              </div>
            <div>
              <button className="button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterForm;

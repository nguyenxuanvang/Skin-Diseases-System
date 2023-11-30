import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../redux/api/auth.slice";
import '../Register/Register.css'
function RegisterForm() {
  const navigate = useNavigate();
  const [signUp] = authApi.useSignUpMutation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email === '' || name === '' || password === '' || confirmPassword === '') {
      const message = 'Not allowed to be empty !';
      toast.error(message,{autoClose: 3000});
    } else {
      if (password === confirmPassword) {
        const response = await signUp({
          email,
          name,
          password,
          confirmPassword,
          isDoctor
        })
        if (response.error) {
          const message = response.error.data.message;
          toast.error(message,{autoClose: 3000});
        } else {
          const message = response.data.message;
          toast.success(message,{autoClose: 1000});
          setTimeout(() => {
            navigate("/Login");
          }, [500]);
        }
      } else {
        const message = "Password Confirmation does not match !";
        toast.error(message,{autoClose: 3000});
      }
    }
  };

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
                onChange={(e) => { setEmail(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/Login/email.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
              </div>
            </div>
            <div className="group">
              <label for="username">Name</label>
              <br></br>
              <input
                type="text"
                id="username"
                placeholder="Enter your Name"
                name="username"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/Login/user.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
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
                onChange={(e) => { setPassWord(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/Login/lock.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
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
                onChange={(e) => { setConfirmPassWord(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/Login/lock.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
              </div>
            </div>
            <div className="flex-row" id="rememberRegister">
              <div className="cbRemember">
                <input type="checkbox" checked={isDoctor}
                  onChange={(e) => { setIsDoctor(e.target.checked) }}></input>
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

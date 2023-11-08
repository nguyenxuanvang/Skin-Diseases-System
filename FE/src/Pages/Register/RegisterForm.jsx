import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./Register.module.css";
import { signUpService } from "../../services/author/auth.service";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(false);

  const onClickShowConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      if (confirmPassword === password) {
        const response = await signUpService(signUpPayLoad);
        const message = response.data.message;
        toast.success(message);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Login");
        }, [3000]);
      } else {
        toast.error("Password not match");
      }
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      setIsLoading(false);
    }
  };

  const { email, username, password, confirmPassword } = signUpPayLoad;

  return (
    <div className={Styles.form}>
      <div>
        <div>
          <div className={Styles.title}>Sign up</div>
          <div className={Styles.des}>
            If you already have an account register
          </div>
          <div>
            <div className={Styles.link}>
              You can &nbsp;
              <Link to="/Login">Login here !</Link>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className={Styles.group}>
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
              <div className="icon"></div>
            </div>
            <div className={Styles.group}>
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
              <div className={Styles.icon}></div>
            </div>
            <div className={Styles.group}>
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
              <div className="icon"></div>
              <div className="showPassword">
                <i
                  class={showPass ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                  onClick={onClickShowPassword}
                ></i>
              </div>
            </div>
            <div className={Styles.group}>
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
              <div className={Styles.icon}></div>
              <div className={Styles.showPassword}>
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
            <div>
              <Button className={Styles.button} onClick={handleRegister}>
                {isLoading ? "Loading…" : "Register"}{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterForm;

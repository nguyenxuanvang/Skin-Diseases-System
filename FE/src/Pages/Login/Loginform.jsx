import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInService } from "../../services/author/auth.service";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickShowPassword = () => {
    setShow(!show);
  };

  const handChangeEmailValue = (e) => {
    setEmail(e.target.value);
  };

  const handChangePasswordValue = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handLogin = async () => {
    try {
      setIsLoading(true);
      const response = await signInService(email, password);
      const message = response.data.message;
      const accessToken = response.data.accessToken;
      const avatar = response.data.avatar;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("avatar", avatar);
      toast.success(message);
      if (response.data.role === "user") {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, [3000]);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          navigate("/admin");
        }, [3000]);
      }
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <div className={Styles.form}>
      <div>
        <div>
          <div className={Styles.title}>Login</div>
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
              <label for="email">Email</label>
              <br></br>
              <input
                type="email"
                id={Styles.email}
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={handChangeEmailValue}
              ></input>
              <div className={Styles.icon}></div>
            </div>
            <div className={Styles.group}>
              <label for="password">Password</label>
              <br></br>
              <input
                type={show ? "text" : "password"}
                id={Styles.password}
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={handChangePasswordValue}
              ></input>
              <div className={Styles.icon} style={{ top: "34px" }}></div>
              <div className={Styles.showPassword}>
                <i
                  class={show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                  onClick={onClickShowPassword}
                ></i>
              </div>
            </div>
            <div className={Styles.flex_row}>
              <div className={Styles.flex_row}>
                <div className={Styles.cbRemember}>
                  <input type="checkbox"></input>
                </div>
                <div className={Styles.remember}>Remember me</div>
              </div>
              <div className={Styles.forgotPassword}>Forgot Password ?</div>
            </div>
            <div>
              <Button className={Styles.button} onClick={handLogin}>
                {isLoading ? "Loading…" : "Login"}{" "}
              </Button>
            </div>
          </form>
        </div>
        {/* <div>
          <div className={Styles.continue}>or continue with</div>
          <div className={Styles.google}>
            <button className="btn-gg">Sign in with Google</button>
            <div className={Styles.icon}>
              <img src="./images/Login/google.png" alt="" />
            </div>
          </div>
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

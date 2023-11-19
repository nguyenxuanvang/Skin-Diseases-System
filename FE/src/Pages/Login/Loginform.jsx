import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import '../Login/Login.css'
const LoginForm = () => {
  const [show, setShow] = useState(false);

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
  
  const handleLogin = () => {
    if (email === "admin123" && password === "123") {
      toast.success('Login successful!');
      
      navigate('/menu-list'); 
    } else {
      toast.error('Invalid credentials. Please try again.');
    }

    if (email === "doctor123" && password === "123") {
      toast.success('Login successful!');
      
      navigate('/DoctorInformationPage'); 
    } else {
      toast.error('Invalid credentials. Please try again.');
    }

    if (email === "user123" && password === "123") {
      toast.success('Login successful!');
      
      navigate('/UserInformationPage'); 
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="form">
      <div>
        <div>
          <div className="title">Login</div>
          <div className="des">
            If you don’t have an account register
          </div>
          <div>
            <div className="link">
              You can &nbsp;
              <Link to="/Register">Register here !</Link>
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
                onChange={handChangeEmailValue}
              ></input>
              <div className="icon">
                <img src='/images/login/email.png' alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
            </div>
            <div className="group">
              <label for="password">Password</label>
              <br></br>
              <input
                type={show ? "text" : "password"}
                id="password"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={handChangePasswordValue}
              ></input>
              <div className="icon">
              <img src='/images/login/lock.png'alt="" style={{width: "17px", height: "17px", verticalAlign: "top"}}/>
              </div>
              <div className="showPassword">
                <i
                  className={show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                  onClick={onClickShowPassword}
                ></i>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-row">
                <div className="cbRemember">
                  <input type="checkbox"></input>
                </div>
                <div className="remember">Remember me</div>
              </div>
            </div>
            <div>
              <button className="button" onClick={handleLogin} >
                Login
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="continue">or continue with</div>
          <div className="google">
            <button className="btn-gg">Sign in with Google</button>
            <div className="icon">
              <img src="./images/Login/google.png" alt="" style={{width: "26px", height: "26px"}} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

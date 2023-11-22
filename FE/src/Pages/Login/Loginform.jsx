import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authApi from "../../redux/api/auth.slice";
import "react-toastify/dist/ReactToastify.css";
import "../Login/Login.css";
const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = authApi.useLoginMutation();
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('rememberE')) || '');
  const [password, setPassword] = useState(JSON.parse(localStorage.getItem('rememberP')) || '');
  const [isRemember, setIsRemember] = useState((localStorage.getItem('rememberE')) ? true : false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      const message = 'Not allowed to be empty !';
      toast.error(message);
    } else {
      const response = await login({
        email,
        password
      });
      if (response.error) {
        const message = response.error.data.message;
        toast.error(message);
      } else {
        const message = response.data.message;
        toast.success(message);
        if(isRemember) {
          localStorage.setItem('rememberE',JSON.stringify(email));
          localStorage.setItem('rememberP',JSON.stringify(password));
        } else {
          localStorage.removeItem('rememberE');
          localStorage.removeItem('rememberP');
        }
        localStorage.setItem('token',JSON.stringify(response.data.data.accessToken));
        if (response.data.data.role === 'admin') {
          setTimeout(() => {
            navigate("/menu-list");
          }, [500]);
        } else {
          setTimeout(() => {
            navigate("/Home");
          }, [500]);
        }
      }
    }
  };

  return (
    <div className="form">
      <div>
        <div>
          <div className="title">Login</div>
          <div className="des">If you don’t have an account register</div>
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
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/login/email.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
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
                onChange={(e) => { setPassword(e.target.value) }}
              ></input>
              <div className="icon">
                <img src='/images/login/lock.png' alt="" style={{ width: "17px", height: "17px", verticalAlign: "top" }} />
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-row">
                <div className="cbRemember">
                  <input type="checkbox" checked={isRemember} onChange={(e) => { setIsRemember(e.target.checked) }}></input>
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
              <img
                src="./images/Login/google.png"
                alt=""
                style={{ width: "26px", height: "26px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;

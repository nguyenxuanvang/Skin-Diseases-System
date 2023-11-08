import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import IntrductionPage from "./Pages/Introduction";
import styles from "./style.module.css";
import TestPage from "./Pages/TestPage";
import InformationDoctorPage from "./Pages/InformationDoctorPage";
import { BsFillBellFill } from "react-icons/bs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Sidebar from "./Admin/components/Sidebar/Sidebar";
import OverviewPage from "./Admin/Pages/OverviewPage";
import DoctorManagementPage from "./Admin/Pages/DoctorManagementPage";
import NewsManagementPage from "./Admin/Pages/NewsManagementPage";
function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <div className={styles.header}>
          <div className={styles.linkLeftColumn}>
            <Link to="/">SkinDiagnoTech</Link>
          </div>

          <div className={styles.linkRightColumn}>
            <ul className={styles.navigation}>
              <li className={styles.link}>
                <Link to="/Introduction">Introduction</Link>
              </li>
              <li className={styles.link}>
                <Link to="/Doctor">Doctor</Link>
              </li>
              <li className={styles.link}>
                <Link to="/TestPage">Test</Link>
              </li>
              <li className={styles.link}>
                <Link to="/Introduction">Q&A</Link>
              </li>
              <li className={styles.link}>
                <Link to="/">Contact</Link>
              </li>
              <li className={styles.link}>
                <div className={styles.bell_Icon}>
                  <BsFillBellFill />
                </div>
              </li>
              <div className={styles.linkToMakeappointment}>
                <button className={styles.formatToMakeappointment}>
                  <Link to="/Introduction">Make an appointment</Link>
                </button>
              </div>

              <div className={styles.linkToLogin}>
                <button className={styles.formatToLogin}>
                  <Link to="/Login">Login</Link>
                </button>
              </div>
            </ul>
          </div>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Introduction" element={<IntrductionPage />} />
            <Route path="/TestPage" element={<TestPage />} />
            <Route path="/Doctor" element={<InformationDoctorPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" extract element={<Register />} />
            <Route
              path="*"
              element={<main style={{ padding: "1rem" }}></main>}
            />
          </Routes>
        </div>

        <>
          <div className="d-flex ">
            <Sidebar />
            <div className="overview w-75 bg-white">
              <Routes>
                <Route path="/menu-list" element={<OverviewPage />} />
                <Route
                  path="/doctor-management"
                  element={<DoctorManagementPage />}
                />
                <Route
                  path="/news-management"
                  element={<NewsManagementPage />}
                />
                <Route
                  path="*"
                  element={<main style={{ padding: "1rem" }}></main>}
                />
              </Routes>
            </div>
          </div>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;

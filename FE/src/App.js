import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import IntrductionPage from "./Pages/Introduction";
import styles from "./style.module.css";
import TestPage from "./Pages/TestPage";
import InformationDoctorPage from "./Pages/InformationDoctorPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Sidebar from "./Admin/components/Sidebar/Sidebar";
import OverviewPage from "./Admin/Pages/OverviewPage";
import DoctorManagementPage from "./Admin/Pages/DoctorManagementPage";
import NewsManagementPage from "./Admin/Pages/NewsManagementPage";
import DetailNewsPage from './Pages/DetailNewsPage/DetailNewsPage';
import DetailDoctorPage from './Pages/DetailDoctorPage';
import ScrollToTop from './components/ScrollToTop';
import { configRoutes } from './utils/configRoutes'
import Header from './components/Header';
import NewsPage from './Pages/News/NewsPage';
import DetailForumPage from './Pages/DetailForumPage';
import ForumPage from './Pages/ForumPage/ForumPage';
import Contact from './Pages/Contact';
import AddNewsPage from '../src/Admin/Pages/OverviewPage/OverviewPage'
function App() {
  return (
    <>
      <div className={styles.App}>
        <ScrollToTop />
        <div style={{ position: 'fixed', width: '100%', backgroundColor: 'white', height: '100px', top: '0', zIndex: '1' }}>
          <Header />
        </div>
        <div style={{ backgroundColor: 'white', marginTop: '100px' }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={configRoutes.home} replace={true} />}
            />
            <Route path={configRoutes.home} element={<HomePage />} />
            <Route path={configRoutes.Introduction} element={<IntrductionPage />} />
            <Route path={configRoutes.TestPage} element={<TestPage />} />
            <Route path={configRoutes.Doctor} element={<InformationDoctorPage />} />
            <Route path={configRoutes.NewsPage} element={<NewsPage />} />
            <Route path={configRoutes.DetailNewsPage} element={<DetailNewsPage />} />
            <Route path={configRoutes.DetailDoctorPage} element={<DetailDoctorPage />} />
            <Route path={configRoutes.ForumPage} element={<ForumPage />} />
            <Route path={configRoutes.DetailForumPage} element={<DetailForumPage />} />
            <Route path={configRoutes.Contact} element={<Contact />} />
            <Route path={configRoutes.Login} element={<Login />} />
            <Route path={configRoutes.Register} extract element={<Register />} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>404 Page not found 😂😂😂</p>
                </main>
              }
            />
          </Routes>
        </div>
      </div>
      <div className="d-flex ">
        <Sidebar />
        <div className='overview w-75 bg-white'>
        <Routes>   
        <Route
            path="/"
            element={<Navigate to='/menu-list' replace={true} />}
          /> 
          <Route path='/menu-list' element={<OverviewPage />} />
          <Route path='/doctor-management' element={<DoctorManagementPage />} />
          <Route path='/news-management' element={<NewsManagementPage />} />
          <Route path='/add-news' element={<AddNewsPage />} />                
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>404 Page not found 😂😂😂</p>
              </main>
            }
          />
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

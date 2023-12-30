import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home'
import IntrductionPage from './Pages/Introduction';
import styles from './style.module.css';
import TestPage from './Pages/TestPage';
import InformationDoctorPage from './Pages/InformationDoctorPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { configRoutes } from './utils/configRoutes'
import NewsPage from './Pages/News/NewsPage';
import DetailNewsPage from './Pages/DetailNewsPage/DetailNewsPage';
import DetailDoctorPage from './Pages/DetailDoctorPage';
import ScrollToTop from './components/ScrollToTop';
import ForumPage from './Pages/ForumPage/ForumPage';
import Contact from './Pages/Contact';
import DetailForumPage from './Pages/DetailForumPage';
import OverviewPage from './Admin/Pages/OverviewPage';
import DoctorManagementPage from './Admin/Pages/DoctorManagementPage';
import UserManagementPage from './Admin/Pages/UserManagementPage/UserManagementPage';
import NewsManagementPage from './Admin/Pages/NewsManagementPage';
import AddNewsPage from './Admin/Pages/AddNewsPage'
import QAManagementPage from './Admin/Pages/QAManagementPage/QAManagementPage';
import ApprovalPage from './Admin/Pages/ApprovalPage/ApprovalPage';
import DoctorAccountPage from './Doctor/Pages/DoctorAccountPage'
import DoctorInformationPage from './Doctor/Pages/DoctorInformationPage';
import EditInformationPage from './Doctor/Pages/EditInformationPage';
import HistoryQAPage from './Doctor/Pages/HistoryQAPage';
import ApprovalRequestPage from './Doctor/Pages/ApprovalRequestPage/ApprovalRequestPage';
import DetailDoctorInformation from './Doctor/Components/DetailDoctorInformation/DetailDoctorInformation';
import UserInformationPage from '../src/User/Pages/UserInformationPage'
import HistoryUserQAPage from './User/Pages/HistoryQAPage/HistoryQAPage';
import DetailUserInformation from './User/Components/DetailUserInformation';
import UserAccountPage from './User/Pages/UserAccountPage/UserAccountPage';
import UserEditInformationPage from './User/Pages/UserEditInformationPage/UserEditInformationPage';

function App() {
  return (
    <>
      <div className={styles.App}>
        <ScrollToTop />
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
        </Routes>

        <div className='overview w-75 bg-white'>
          <Routes>
            <Route path='/menu-list' element={<OverviewPage />} />
            <Route path='/doctor-management' element={<DoctorManagementPage />} />
            <Route path='/user-management' element={<UserManagementPage />} />
            <Route path='/news-management' element={<NewsManagementPage />} />
            <Route path='/add-news' element={<AddNewsPage />} />
            <Route path='/QAManagementPage' element={<QAManagementPage />} />
            <Route path='/ApprovalPage' element={<ApprovalPage/>} />
          </Routes>
        </div>

        <div className='overview_doctor bg-white' style={{marginTop:'100px'}}>
          <Routes>
            <Route path='/DoctorInformationPage' element={<DoctorInformationPage />} />
            <Route path='/DetailDoctorInformation' element={<DetailDoctorInformation />} />
            <Route path='/EditInformationPage' element={<EditInformationPage />} />
            <Route path='/DoctorAccountPage' element={<DoctorAccountPage />} />
            <Route path='/HistoryQAPage' element={<HistoryQAPage />} />
            <Route path='/ApprovalRequestPage' element={<ApprovalRequestPage/>} />
          </Routes>
        </div>

        <div className='overview_user bg-white' style={{marginTop:'100px'}}>
          <Routes>
            <Route path='/UserInformationPage' element={<UserInformationPage />} />
            <Route path='/DetailUserInformation' element={<DetailUserInformation />} />
            <Route path='/UserEditInformationPage' element={<UserEditInformationPage />} />
            <Route path='/UserAccountPage' element={<UserAccountPage />} />
            <Route path='/HistoryUserQAPage' element={<HistoryUserQAPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}


export default App;

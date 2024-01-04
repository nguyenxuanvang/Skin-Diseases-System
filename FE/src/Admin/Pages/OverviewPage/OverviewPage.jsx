import React from "react";
import Styles from "./Overview.module.css";
import Chart from "../../components/Chart";
import Overview from "../../components/Overview/Overview";
import Sidebar from '../../components/Sidebar/Sidebar';
import doctorApi from '../../../redux/api/doctor.slice';
import userApi from '../../../redux/api/user.slice';
import questionApi from '../../../redux/api/question.slice';
import newsApi from '../../../redux/api/news.slice';
function OverviewPage() {
  const {data: objD = {}} = doctorApi.useGetListDoctorQuery();
  const {data: objU = {}} = userApi.useGetListUserQuery();
  const {data: objQ = {}} = questionApi.useGetQuestionListQuery();
  const {data: objN = {}} = newsApi.useGetListNewsQuery();
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
      </div>
      <div className={Styles.overview_page}>
        <div className="d-flex">
          <Overview 
            img_icon="news_logo.png"
            total_quantity={objN.data?.length}
            des_quantity="Tin Tức"
          />
          <Overview
            img_icon="doctor_logo.png"
            total_quantity={objD.data?.length}
            des_quantity="Bác Sĩ"
          />
          <Overview
            img_icon="user_logo.png"
            total_quantity={objU.data?.length}
            des_quantity="Người Dùng"
          />
          <Overview
            img_icon="question_logo.png"
            total_quantity={objQ.data?.length}
            des_quantity="Bài Viết"
          />
        </div>
        <div className={Styles.chart}>
          <Chart title='Tin Tức' values={objN.data}/>
          <Chart title='Bác Sĩ' values={objD.data}/>
          <Chart title='Người Dùng' values={objU.data}/>
          <Chart title='Bài Viết' values={objQ.data}/>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;

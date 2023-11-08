import React from "react";
import Styles from "./DoctorManagementPage.module.css";
import DoctorManagement from "../../components/DoctorManagement/DoctorManagement";
function DoctorManagementPage() {
  return (
    <div className={Styles.doctorManagement_overview}>
      <DoctorManagement />
    </div>
  );
}

export default DoctorManagementPage;

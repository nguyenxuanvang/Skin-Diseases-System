import React from "react";
import Styles from "./NewsManagementPage.module.css";
import NewsManagement from "./NewsManagementPage";
function NewsManagementPage() {
  return (
    <div className={Styles.newsManagement_overview}>
      <NewsManagement />
    </div>
  );
}

export default NewsManagementPage;

import React from "react";
import Styles from "./HomeIntroductionList.module.css";
function HomeIntroductionList({
  boxcolor = "#F2BFF0",
  text_des = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, velit fugit. Perferendis vel ab voluptatibus, incidunt aliquid numquam nostrum. Quidem reprehenderit rem, recusandae placeat qui aliquid fuga dolores repellendus cum!",
}) {
  return (
    <>
      <div className={Styles.introduction_title}>
        <div
          className={Styles.introduction_boxcolor}
          style={{ backgroundColor: boxcolor }}
        ></div>

        <div className={Styles.introduction_des}>
          <p>{text_des}</p>
        </div>
      </div>
    </>
  );
}

export default HomeIntroductionList;

import React from 'react';
import Styles from './Goal.module.css';

function Goal({
  icon_goal_right = 'Philosophy',
  icon_img_right = 'Goal_icon_1.png',
  goal_des_right = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.',
  goal_img_right = 'Goal_img_1.png',

}) {
  return (
    <>
      <div
        className={Styles.introduction_Goal_Left}
      >
        <div className={Styles.goal_Icon}>
          <img className={Styles.icon_img} src={`./images/Goal_icon/${icon_img_right}`} alt="" />
          <span className={Styles.goal_Title}>{icon_goal_right}</span>
          <div className={Styles.goal_Des}>
            <p className={Styles.goal_text}>{goal_des_right}</p>
          </div>
        </div>

        <div className={Styles.goal_Img}>
          <img className={Styles.goal_img_list} src={`./images/Goal_icon/${goal_img_right}`} alt="" />
        </div>
      </div>
    </>
  );
}

export default Goal;
import React from 'react';

import Goal from '../../components/Goal/Goal';

function IntroductionGoal() {
  return (
    <>
      <div>
        <Goal />
        <Goal goal_img_right='Goal_img_2.png'/>\
        <Goal />
      </div>
    </>
  );
}

export default IntroductionGoal;
import React from 'react'
import { useMyContext } from '../../MyContext/context';
import Styles from "./TestPage.module.css";
function TestDiagno_Result() {
  const { data, updateData } = useMyContext();
  return (
    <>
    <div className={Styles.result_Title}>
        Result:
    </div>

    <div className={Styles.result_Des}>
        <p>
            {data.result}
        </p>
    </div>
    </>
  )
}

export default TestDiagno_Result
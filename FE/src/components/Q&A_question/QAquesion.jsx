import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './QAquestion.module.css'
import { FiMessageCircle } from "react-icons/fi";
function QaQuestion(
    {
    avatar_QA = 'doctor_img_1.png',
    title_question = 'Nội dung 1',
    date_question = '13/11/2023',
    number_reply = '1'
}
) {
    return (
        <>
            <div className='d-flex' style={{margin:'50px 0 0 100px'}}>
                <div className={Styles.avatar_question}>
                    <img src={`./images/Doctor/${avatar_QA}`} alt="" />
                </div>
                <div className='title_question' style={{padding:'5px 0 0 20px'}}>
                   <Link style={{textDecoration:'none', color:'black'}}><h3>{title_question}</h3></Link>
                    <div className='d-flex'>
                        <p style={{paddingRight:'30px'}}>{date_question}</p>
                        <p style={{paddingRight:'30px'}}><FiMessageCircle/>{number_reply}</p>
                        <Link to='/DetailForumPage' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>Reply</Link>
                    </div>
                </div>

            </div>

            <div className='text-center' style={{width:'60%', height:'1px', backgroundColor:'black', margin:'20px 0 0 100px'}}>
                
            </div>
        </>
    )
}

export default QaQuestion
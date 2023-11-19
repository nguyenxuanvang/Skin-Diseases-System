import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './Q&AquestionUser.module.css'
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRight } from "react-icons/ai";

function QAquestionUser(
    {
    avatar_doctor_QA = 'doctor_img_1.png',
    title_question = 'Nội dung 1',
    date_question = '13/11/2023',
    number_reply = '1'
}
) {
    return (
        <>
            <div className='d-flex' style={{margin:'50px 0 0 100px'}}>
                <div className={Styles.avatar_question}>
                    <img src={`./images/Doctor/${avatar_doctor_QA}`} alt="" />
                </div>
                <div className='title_question' style={{padding:'5px 0 0 20px'}}>
                   <Link to='/DetailForumPage' style={{textDecoration:'none', color:'black'}}><h3>{title_question}</h3></Link>
                    <div className='d-flex'>
                        <p style={{paddingRight:'30px'}}>{date_question}</p>
                        <p style={{paddingRight:'30px'}}><FiMessageCircle/>{number_reply}</p>
                        <Link to='/DetailForumPage' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>See More<AiOutlineRight /></Link>
                    </div>
                </div>

            </div>

            <div className='text-center' style={{width:'60%', height:'1px', backgroundColor:'black', margin:'20px 0 0 100px'}}>
                
            </div>
        </>
    )
}

export default QAquestionUser
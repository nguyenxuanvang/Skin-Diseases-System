import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './QAquestion.module.css'
import { FiMessageCircle } from "react-icons/fi";
function QaQuestion({question}) {
    const date = new Date(question.createdAt);
    const time = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() 
    + ' ' + date.getHours() + ":" + date.getMinutes() + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return (
        <>
            <div className='d-flex' style={{margin:'50px 0 0 100px'}}>
                <div className={Styles.avatar_question}>
                    <img src={`http://localhost:3000/${(question.Doctor_id) ? 'doctor' : 'user'}/image/${(question.Doctor_id) ? question.Doctor_id : question.User_id}`} alt="" />
                </div>
                <div className='title_question' style={{padding:'5px 0 0 20px'}}>
                   <Link to='/DetailForumPage' style={{textDecoration:'none', color:'black'}}><h3>{question.Content}</h3></Link>
                    <div className='d-flex'>
                        <p style={{paddingRight:'30px'}}>{time}</p>
                        <p style={{paddingRight:'30px'}}><FiMessageCircle/>{question.num_comments}</p>
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
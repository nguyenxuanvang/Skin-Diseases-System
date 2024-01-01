import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './QAquestion.module.css'
import { FiMessageCircle } from "react-icons/fi";
function QaQuestion({question}) {
    const date = new Date(question.createdAt);
    const time = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear() 
    + ' ' + ((date.getHours() > 9) ? date.getHours() : `0${date.getHours()}`) + ":" + ((date.getMinutes() > 9) ? date.getMinutes() : `0${date.getMinutes()}`) + ' ' + ((date.getHours() > 11) ? 'PM' : 'AM');
    return (
        <>
            <Link to={`/DetailForumPage/${question.Question_id}`} style={{textDecoration:'none', color:'black'}}>
            <div className='d-flex' style={{margin:'50px 0 0 100px'}}>
                <div className={Styles.avatar_question}>
                    <img style={{border: (question?.approved) ? '4px solid #12d212' : '4px solid #4070F4'}} src={`http://localhost:3000/detail/image/${question.avatar}`} alt="" />
                </div>
                <div className='title_question' style={{padding:'5px 0 0 20px'}}>
                   <Link to={`/DetailForumPage/${question.Question_id}`} style={{textDecoration:'none', color:'black'}}><h3 className={Styles.title}>{question.Content}</h3></Link>
                    <div className='d-flex'>
                        <p style={{paddingRight:'30px'}}>{time}</p>
                        <p style={{paddingRight:'30px'}}><FiMessageCircle/>{question.num_comments}</p>
                        <Link to={`/DetailForumPage/${question.Question_id}`} style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>Xem Chi Tiết</Link>
                    </div>
                </div>

            </div>
            </Link>

            <div className='text-center' style={{width:'60%', height:'1px', backgroundColor:'black', margin:'20px 0 0 100px'}}>
                
            </div>
        </>
    )
}

export default QaQuestion
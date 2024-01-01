import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './QAquestionDoctor.module.css'
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRight } from "react-icons/ai";

function QAquestionDoctor({item,info}) {
    const date = new Date(item.createdAt);
    const newDate = String(date.getFullYear())+ '-' + String(date.getMonth()+1)+ '-' + String(date.getDate());
    return (
        <>
            <div className='d-flex' style={{margin:'50px 0 0 100px'}}>
                <div className={Styles.avatar_question}>
                    <img src={`http://localhost:3000/detail/image/${info.user.avatar}`} alt="" />
                </div>
                <div className='title_question' style={{padding:'5px 0 0 20px'}}>
                   <Link to={`/DetailForumPage/${item.Question_id}`} style={{textDecoration:'none', color:'black'}}><h3>{item.Content}</h3></Link>
                    <div className='d-flex'>
                        <p style={{paddingRight:'30px'}}>{newDate}</p>
                        <p style={{paddingRight:'30px'}}><FiMessageCircle/>{item.num_comments}</p>
                        <Link to={`/DetailForumPage/${item.Question_id}`} style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>Xem Chi Tiết<AiOutlineRight /></Link>
                    </div>
                </div>

            </div>

            <div className='text-center' style={{width:'60%', height:'1px', backgroundColor:'black', margin:'20px 0 0 100px'}}>
                
            </div>
        </>
    )
}

export default QAquestionDoctor
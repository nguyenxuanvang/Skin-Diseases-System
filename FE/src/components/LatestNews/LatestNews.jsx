import React from 'react'
import {Link} from 'react-router-dom'
import Styles from './LatestNews.module.css'
function LatestNews({question}) {
    return (
        <>
            <div className={Styles.latestNews}> 
                <div className={Styles.latestNews_des} style={{padding:'10px 0 0 10px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                    <Link to={`/DetailForumPage/${question.Question_id}`} style={{textDecoration:'none',color:'black',fontWeight:'bold'}}> {question.Content} </Link>
                </div>
            </div>
        </>
    )
}

export default LatestNews
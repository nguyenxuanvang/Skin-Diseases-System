import React from 'react'
import {Link} from 'react-router-dom';
import Styles from './NewsPage.module.css'
import { BsFillCaretRightFill } from "react-icons/bs";
import newsApi from '../../redux/api/news.slice';
function NewsType() {
    const {data = {}} = newsApi.useGetListNewsQuery();
    return (
        <>
            <div className={Styles.newsType}>
                <div className={Styles.newsType_title}>Tin Tức Mới Nhất</div>
                <div className={Styles.newsType_list}>
                    {data.data?.map(item => (
                        <div className={Styles.newsType_list_des}>
                            <BsFillCaretRightFill/> <Link to={`/DetailNewsPage/${item.News_id}`} style={{textDecoration:'none', color:'black', fontWeight:'bold'}}> {item.Title} </Link>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}

export default NewsType
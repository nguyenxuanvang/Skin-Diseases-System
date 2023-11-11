import React from 'react'
import Styles from './NewsPage.module.css'
import { BsFillCaretRightFill } from "react-icons/bs";
function NewsType() {
    return (
        <>
            <div className={Styles.newsType}>
                <div className={Styles.newsType_title}>Chuyên mục tin tức</div>
                <div className={Styles.newsType_list}>
                    <div className={Styles.newsType_list_des}>
                        <BsFillCaretRightFill/> Mới nhất
                    </div>

                    <div className={Styles.newsType_list_des}>
                        <BsFillCaretRightFill/> Mới nhất
                    </div>

                    <div className={Styles.newsType_list_des}>
                        <BsFillCaretRightFill/> Mới nhất
                    </div>

                    <div className={Styles.newsType_list_des}>
                        <BsFillCaretRightFill/> Mới nhất
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsType
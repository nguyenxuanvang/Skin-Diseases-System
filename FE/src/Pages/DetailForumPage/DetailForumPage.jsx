import React from 'react'
import DetailQuestion from '../../components/DetailQuestion'
import Styles from './DetailForumPage.module.css'
import Footer from '../../components/Footer/Footer'
function DetailForumPage() {
    return (
        <>
            <div className={Styles.detailForumPage_header}>
                <img src="./images/NewsBanner/NewsBanner.png" alt="" style={{ height: '300px' }} />

                <div className={Styles.detailForumPage_Title}>
                    Câu hỏi thường gặp
                </div>
            </div>

            <div>
                <DetailQuestion />
            </div>

            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}

export default DetailForumPage
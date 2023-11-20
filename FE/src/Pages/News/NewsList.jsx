import React, { useState } from 'react';
import News from '../../components/News';
import Styles from './NewsPage.module.css';

function NewsList() {
    const [visibleNewsCount, setVisibleNewsCount] = useState(3);

    const handleShowMore = () => {
        setVisibleNewsCount((prevCount) => prevCount + 3);
    };

    return (
        <>
            <div className={Styles.newsList_list_news}>
                {[...Array(visibleNewsCount)].map((_, index) => (
                    <News key={index} />
                ))}
            </div>
            <div className='text-center mt-5'>
                <button
                    style={{ width: 300, borderRadius: 10, marginBottom: '50px' }}
                    onClick={handleShowMore}
                >
                    Hiển thêm
                </button>
            </div>
        </>
    );
}

export default NewsList;

import React, { useState } from 'react';
import News from '../../components/News';
import Styles from './NewsPage.module.css';
import newsApi from '../../redux/api/news.slice';
function NewsList() {
    const { data = {} } = newsApi.useGetListNewsQuery();
    let [numberNews, setNumberNews] = useState(3);

    const handleShowMore = () => {
        if ((numberNews + 3) > data.data.length) {
            if (numberNews === data.data.length) {
            } else {
                setNumberNews(data.data.length);
            }
        } else {
            setNumberNews((nb) => nb + 3);
        }
    };

    return (
        <>
            <div className={Styles.newsList_list_news}>
                {data.data?.slice(0, numberNews).map(item => (
                    <News key={item.News_id} news={item} />
                ))}
            </div>
            {(data.data?.length > numberNews) && <div className='text-center mt-5'>
                <button
                    style={{ width: 300, borderRadius: 10, marginBottom: '50px' }}
                    onClick={handleShowMore}
                >
                    Hiển thêm
                </button>
            </div>}

        </>
    );
}

export default NewsList;

import React from 'react'
import News from '../../components/News';
import Styles from './NewsPage.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function NewsList(
    ) {
    return (
        <>
        <div className={Styles.newsList_list_news}>
            <News/>
            <News/>
            <News/>
        </div>

        <div className={Styles.pagination_pageNumber}>
                <Stack spacing={2}>
                <Pagination count={10} variant="outlined" color="primary" classes={{ ul: Styles.paginationNumbers }} />
                </Stack>
            </div>
        </>
    )
}

export default NewsList
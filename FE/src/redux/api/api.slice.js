import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: builder => ({})
});

export default apiSlice;
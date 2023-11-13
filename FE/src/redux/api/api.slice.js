import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
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
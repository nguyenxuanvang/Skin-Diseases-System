import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";

const personalApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDetailInfor: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/detail'
    }),
    updateDoctor: builder.mutation({
      query: arg => ({
        url: '/doctor/',
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log('dddddddddd');
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getDetailInfor', undefined, draft => {
              
            });
            dispatch(action);
          }
        } catch {

        }
      }
    }),
  })
});
export default personalApi;
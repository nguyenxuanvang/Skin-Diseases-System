import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const questionApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getQuestionList: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/question/public'
    }),
    createQuestion: builder.mutation({
      query: arg => ({
        url: '/question',
        method: 'POST',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestionList', undefined, draft => {
              draft.data.push(response.data.data);
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
  })
})
export default questionApi;
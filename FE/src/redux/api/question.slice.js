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
    getQuestion: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `/question/detail/${id}`
      })
    }),
    getOwnerQuestion: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `/question/owner/${id}`
      })
    }),
    getSearchQuestions: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (content) => ({
        url: `/question/search`,
        params: content
      })
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
              draft.data.unshift(response.data.data);
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateQuestion: builder.mutation({
      query: ({id,Content}) => ({
        url: `/question/detail/${id}`,
        method: 'PATCH',
        body: {Content}
      }),
      async onQueryStarted({id,Content}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              draft.data.Content = Content;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    deleteQuestion: builder.mutation({
      query: id => ({
        url: `/question/detail/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getSearchQuestions', undefined, draft => {
              const findIndex = draft.data.findIndex(item => item.Question_id === id);
              draft.data.splice(findIndex,1);  
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
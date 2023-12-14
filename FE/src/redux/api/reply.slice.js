import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const replyApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createReply: builder.mutation({
      query: ({id,arg}) => ({
        url: `/replies/${id}`,
        method: 'POST',
        body: arg
      }),
      async onQueryStarted({id,arg}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              const findComment = draft.data.comments.find(item => item.Comment_id === id);
              findComment.replies.unshift(response.data.data);
            });
            await dispatch(action);
            const action2 = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              draft.data.num_comments += 1;
            });
            await dispatch(action2);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateReply: builder.mutation({
      query: ({id,Content,idC}) => ({
        url: `/replies/${id}`,
        method: 'PATCH',
        body: {Content}
      }),
      async onQueryStarted({id,Content, idC}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              const findIndexC = draft.data.comments.findIndex(item => item.Comment_id === idC);
              const findIndexR = draft.data.comments[findIndexC].replies.findIndex(item => item.Replies_id === id);
              draft.data.comments[findIndexC].replies[findIndexR].Content = Content;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    deleteReply: builder.mutation({
      query: ({id,idC}) => ({
        url: `/replies/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted({id,idC}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              const findIndexC = draft.data.comments.findIndex(item => item.Comment_id === idC);
              const findIndexR = draft.data.comments[findIndexC].replies.findIndex(item => item.Replies_id === id);
              draft.data.num_comments -= 1;
              draft.data.comments[findIndexC].replies.splice(findIndexR,1);
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
  })
});

export default replyApi;
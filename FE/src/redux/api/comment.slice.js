import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const commentApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListComment: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) =>({
        url: `/comment/${id}`
      })
    }),
    getOwnerComment: builder.query({
      query: (id) =>({
        url: `/comment/owner/${id}`
      })
    }),
    createComment: builder.mutation({
      query: ({id,arg}) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              draft.data.comments.unshift(response.data.data);
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
    updateComment: builder.mutation({
      query: ({id,Content}) => ({
        url: `/comment/${id}`,
        method: 'PATCH',
        body: {Content}
      }),
      async onQueryStarted({id,Content}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              const findIndex = draft.data.comments.findIndex(item => item.Comment_id === id);
              draft.data.comments[findIndex].Content = Content;
              draft.data.comments[findIndex].updatedAt = response.data.data.updatedAt;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `/comment/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getQuestion', undefined, draft => {
              const findIndex = draft.data.comments.findIndex(item => item.Comment_id === id);
              draft.data.num_comments -= draft.data.comments[findIndex].replies.length + 1;
              draft.data.comments.splice(findIndex,1);
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

export default commentApi;
import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListUser: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/user'
    }),
    getUser: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `/user/${id}`
      })
    }),
    getSearchUsers: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (name) => ({
        url: `/user/search`,
        params: name
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getSearchUsers', undefined, draft => {
              const findIndex = draft.data.findIndex(item => item.User_id === id);
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
});

export default userApi;
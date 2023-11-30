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
        url: '/doctor',
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getDetailInfor', undefined, draft => {
              draft.user.name = arg.name;
              draft.user.position = arg.position;
              draft.user.work_location = arg.work_location;
              draft.user.experience = arg.experience;
              draft.user.phone = arg.phone;
              draft.user.address = arg.address;
              draft.user.introduce = arg.introduce;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateUser: builder.mutation({
      query: arg => ({
        url: '/user',
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getDetailInfor', undefined, draft => {
              draft.user.name = arg.name;
              draft.user.phone = arg.phone;
              draft.user.address = arg.address;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateImage: builder.mutation({
      query: arg => ({
        url: '/detail/',
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getDetailInfor', undefined, draft => {
              draft.user.avatar = response.data.data.avatar;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    getOwnQuestions: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/question/owner'
    }),
  })
});
export default personalApi;
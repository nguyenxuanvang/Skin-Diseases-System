import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";
const doctorApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListDoctor: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/doctor'
    }),
    getDoctor: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `doctor/${id}`,
      })
    }),
    getSearchDoctors: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (name) => ({
        url: `/doctor/search`,
        params: name
      })
    }),
    getListRequest: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => ({
        url: `doctor/request`,
      })
    }),
    getListRequestDetail: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => ({
        url: `doctor/requestDetail`,
      })
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getSearchDoctors', undefined, draft => {
              const findIndex = draft.data.findIndex(item => item.Doctor_id === id);
              draft.data.splice(findIndex,1);                
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    approvalAccount: builder.mutation({
      query: ({id,result}) => ({
        url: `/doctor/request/${id}`,
        method: 'PATCH',
        body: {result}
      }),
      async onQueryStarted({id,result}, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getListRequest', undefined, draft => {
              const findIndex = draft.data.findIndex(item => item.Doctor_id === id);
              draft.data.splice(findIndex,1);  
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    sendRequest: builder.mutation({
      query: (arg) => ({
        url: `/doctor/requestDetail`,
        method: 'POST',
        body: arg
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getListRequestDetail', undefined, draft => {
                draft.data.unshift(response.data.data);
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    deleteRequest: builder.mutation({
      query: () => ({
        url: `/doctor/requestDetail`,
        method: 'DELETE'
      }),
      async onQueryStarted(arg,{ dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getListRequestDetail', undefined, draft => {
                draft.data.shift();
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

export default doctorApi;
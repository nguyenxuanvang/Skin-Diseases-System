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
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          
          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getListDoctor', undefined, draft => {
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
  })
});

export default doctorApi;
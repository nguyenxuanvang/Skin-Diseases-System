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
  })
});

export default doctorApi;
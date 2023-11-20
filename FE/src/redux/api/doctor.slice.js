import apiSlice from "./api.slice";

const doctorApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDetailDoctor: builder.query({
      serializeQueryArgs: () => {
          return undefined;
      },
      query: () => '/detail'
  }),
    })
});
export default doctorApi;
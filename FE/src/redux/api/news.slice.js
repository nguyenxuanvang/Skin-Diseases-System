import apiSlice from "./api.slice";

const newsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
      createNews: builder.mutation({
            query: arg => ({
                url: '/news/',
                method: 'POST',
                body: arg
            })
      }),
    })
});
export default newsApi;
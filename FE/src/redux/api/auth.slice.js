import apiSlice from "./api.slice";

const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
      signUp: builder.mutation({
            query: arg => ({
                url: '/auth/signup',
                method: 'POST',
                body: arg
            })
      }),
      login: builder.mutation({
            query: arg => ({
                url: '/auth/login',
                method: 'POST',
                body: arg
            })
        })
    })
});
export default authApi;
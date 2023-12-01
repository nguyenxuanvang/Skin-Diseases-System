import apiSlice from "./api.slice";

const diseaseApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDisease: builder.query({
            serializeQueryArgs: () => {
              return undefined;
            },
            query: (name) => `/disease/${name}`
          }),
        predict: builder.mutation({
            query: arg => ({
                url: '/disease/predict',
                method: 'POST',
                body: arg
            })
        }),
        upload: builder.mutation({
            query: arg => ({
                url: '/disease/upload',
                method: 'POST',
                body: arg
            })
        })
    })
});
export default diseaseApi;
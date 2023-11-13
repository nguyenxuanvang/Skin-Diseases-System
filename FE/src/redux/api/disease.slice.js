import apiSlice from "./api.slice";
const diseaseApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        predict: builder.mutation({
            query: arg => ({
                url: '/disease/predict',
                method: 'POST',
                body: arg
            })
        })
    })
});
export default diseaseApi;
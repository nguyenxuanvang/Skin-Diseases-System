import apiSlice from "./api.slice";
import { current } from "@reduxjs/toolkit";

const newsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListNews: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: () => '/news/'
    }),
    getNews: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (id) => ({
        url: `/news/${id}`
      })
    }),
    getSearchNews: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (title) => ({
        url: `/news/search`,
        params: title
      })
    }),
    getNewsRelated: builder.query({
      serializeQueryArgs: () => {
        return undefined;
      },
      query: (name) => ({
        url: `/news/related/${name}`
      })
    }),
    createNews: builder.mutation({
      query: arg => ({
        url: '/news/',
        method: 'POST',
        body: arg
      })
    }),

    updateNews: builder.mutation({
      query: ({ id, arg }) => ({
        url: `/news/${id}`,
        method: 'PATCH',
        body: arg
      }),
      async onQueryStarted({ id, arg }, { dispatch, queryFulfilled }) {
        try {

          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getSearchNews', undefined, draft => {
              const findNews = draft.data.find(item => item.News_id === response.data.data.News_id);
              findNews.Title = response.data.data.Title;
              findNews.Content = response.data.data.Content;
              findNews.image = response.data.data.image;
              findNews.updatedAt = response.data.data.updatedAt;
            });
            await dispatch(action);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {

          const response = await queryFulfilled;
          if (response.data) {
            const action = apiSlice.util.updateQueryData('getSearchNews', undefined, draft => {
              const findIndex = draft.data.findIndex(item => item.News_id === id);
              draft.data.splice(findIndex, 1);
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
export default newsApi;
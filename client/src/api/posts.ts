import {ForumPost} from "@prisma/client";
import {api} from "./apiConfig";
import {sv} from "date-fns/locale";

interface filters {
  page?: number;
  pageSize?: number;
  q?: string;
  
  filters?: {
    // minLikes?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    
    url?: string;
    
    where?: {
      authorId: number
    }
  };
}

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<{ posts:ForumPost[], count:number }, filters>({
      query: (filters) => ({
        url: `/posts`,
        method: "POST",
        body: filters,
      }),
    }),
    // getPostsCount: builder.query<any, void>({
    //   query: () => ({
    //     url: `posts/count`,
    //     method: "GET"
    //   }),
    // }),
    // getPostCount: builder.query<any, number>({
    //   query: (authorId) => ({
    //     url: `posts/count/${authorId}`,
    //     method: "GET"
    //   }),
    // }),
    getPost: builder.query<ForumPost, string>({
      query: (url) => ({
        url: `/posts/${url}`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation<ForumPost, any>({
      query: (postData) => ({
        url: "/posts/add",
        method: "POST",
        body: postData,
      }),
    }),
    editPost: builder.mutation<ForumPost, { url:string, postData:any }>({
      query: ({url, postData}) => ({
        url: `/posts/edit/${url}`,
        method: "PUT",
        body: postData,
      }),
    }),
    removePost: builder.mutation<ForumPost, any>({
      query: (id) => ({
        url: `/posts/remove/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  // useGetPostsCountQuery,
  // useGetPostCountQuery,
  useGetPostQuery,
  useEditPostMutation,
  useRemovePostMutation,
  useAddPostMutation
} = postsApi;

export const {
  endpoints: {
    getAllPosts,
    // getPostsCount,
    // getPostCount,
    getPost,
    editPost,
    removePost,
    addPost
  },
} = postsApi;

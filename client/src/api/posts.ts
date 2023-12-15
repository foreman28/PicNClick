import {ForumPost} from "@prisma/client";
import {api} from "./apiConfig";

interface filters {
  page?: number;
  pageSize: number;
  q?: string;
  
  filters?: {
    // minLikes?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    
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
    editPost: builder.mutation<string, ForumPost>({
      query: (post) => ({
        url: `/posts/edit/${post.id}`,
        method: "PUT",
        body: post,
      }),
    }),
    removePost: builder.mutation<string, string>({
      query: (id) => ({
        url: `/posts/remove/${id}`,
        method: "DELETE",
      }),
    }),
    addPost: builder.mutation<ForumPost, ForumPost>({
      query: (postData) => ({
        url: "/posts/add",
        method: "POST",
        body: postData,
      }),
    })
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

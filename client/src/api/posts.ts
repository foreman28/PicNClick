import {ForumPost} from "@prisma/client";
import {api} from "./apiConfig";

interface filters {
  page?: number;
  pageSize?: number;
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
    getAllPosts: builder.query<ForumPost[], filters>({
      query: (filters) => ({
        url: `/posts`,
        method: "POST",
        body: filters,
      }),
    }),
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
  useGetPostQuery,
  useEditPostMutation,
  useRemovePostMutation,
  useAddPostMutation
} = postsApi;

export const {
  endpoints: {
    getAllPosts,
    getPost,
    editPost,
    removePost,
    addPost
  },
} = postsApi;

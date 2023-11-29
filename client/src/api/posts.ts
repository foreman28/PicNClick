import { ForumPost } from "@prisma/client";
import { api } from "./apiConfig";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<ForumPost[], { page?: number; pageSize?: number; q?: string }>({
      query: ({ page, pageSize, q}) => ({
        url: `/posts`,
        method: "GET",
        params: { page, pageSize, q }, // Pass page and pageSize as query parameters
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
        method: "POST",
        body: { id },
      }),
    }),
    addPost: builder.mutation<ForumPost, ForumPost>({
      query: (postData) => ({
        url: "/posts/add",
        method: "POST",
        body: {postData},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useEditPostMutation,
  useRemovePostMutation,
  useAddPostMutation,
} = postsApi;

export const {
  endpoints: {
    getAllPosts,
    getPost,
    editPost,
    removePost,
    addPost,
  },
} = postsApi;

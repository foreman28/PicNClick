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
      query: (post) => ({
        url: "/posts/add",
        method: "POST",
        body: post,
      }),
    }),
    searchPosts: builder.query<ForumPost[], { search: string }>({
      query: ({ search }) => ({
        url: `/posts/search?q=${search}`,
        method: "GET",
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
  useSearchPostsQuery,
} = postsApi;

export const {
  endpoints: {
    getAllPosts,
    getPost,
    editPost,
    removePost,
    addPost,
    searchPosts,
  },
} = postsApi;

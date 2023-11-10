import { ForumPost } from "@prisma/client";
import { api } from "./api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<ForumPost[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
    getPost: builder.query<ForumPost, string>({
      query: (id) => ({
        url: `/posts/${id}`,
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
      query: (employee) => ({
        url: "/posts/add",
        method: "POST",
        body: employee,
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
} = postApi;

export const {
  endpoints: {
    getAllPosts,
    getPost,
    editPost,
    removePost,
    addPost,
  },
} = postApi;

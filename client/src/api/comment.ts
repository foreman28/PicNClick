import {Comments} from "@prisma/client";
import {api} from "./apiConfig";

export const commentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllComments: builder.query<Comments[], void>({
      query: () => ({
        url: `/comments`,
        method: "GET",
      }),
    }),
    getComment: builder.query<Comments, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation<void, Comments>({
      query: (commentData) => ({
        url: "/comments/add",
        method: "POST",
        body: commentData,
      }),
    }),
    editComment: builder.mutation<string, Comments>({
      query: (comment) => ({
        url: `/comments/edit/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
    }),
    removeComment: builder.mutation<string, string>({
      query: (id) => ({
        url: `/comments/remove/${id}`,
        method: "POST",
        body: {id},
      }),
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} = commentsApi;

export const {
  endpoints: {
    getAllComments,
    getComment,
    addComment,
    editComment,
    removeComment,
  },
} = commentsApi;

import { Likes } from "@prisma/client";
import { api } from "./apiConfig";

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation<Likes, { postId: number, userId: number }>({
      query: ({ postId, userId }) => ({
        url: "/likes/add",
        method: "POST",
        body: { postId, userId },
      }),
    }),
    removeLike: builder.mutation<void, number>({
      query: (id) => ({
        url: `/likes/remove/${id}`,
        method: "DELETE",
      }),
    }),
    getLikesByUser: builder.query<Likes[], number>({
      query: (userId) => ({
        url: `/likes/user/${userId}`,
        method: "GET",
      }),
    }),
    findLikeId: builder.query<number | null, { postId: number; userId: number }>({
      query: ({ postId, userId }) => ({
        url: `/likes/findId`,
        method: "GET",
        params: { postId, userId },
      }),
    }),
  }),
});

export const {
  useAddLikeMutation,
  useRemoveLikeMutation,
  useGetLikesByUserQuery,
  useFindLikeIdQuery,
} = likesApi;

export const {
  endpoints: {
    addLike,
    removeLike,
    getLikesByUser,
    findLikeId,
  },
} = likesApi;

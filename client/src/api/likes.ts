import { Likes } from "@prisma/client";
import { api } from "./apiConfig";

export const likesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleLike: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: "/likes/toggle",
        method: "POST",
        body: { postId },
      }),
    }),
    addLike: builder.mutation<void, { postId: number }>({
      query: ({ postId }) => ({
        url: "/likes/add",
        method: "POST",
        body: { postId },
      }),
    }),
    removeLike: builder.mutation<Likes, number>({
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
    // findLikeId: builder.query<number | null, { postId: number; userId: number }>({
    //   query: ({ postId, userId }) => ({
    //     url: `/likes/findId`,
    //     method: "GET",
    //     params: { postId, userId },
    //   }),
    // }),
  }),
});

export const {
  useToggleLikeMutation,
  useAddLikeMutation,
  useRemoveLikeMutation,
  useGetLikesByUserQuery,
  // useFindLikeIdQuery,
} = likesApi;

export const {
  endpoints: {
    toggleLike,
    addLike,
    removeLike,
    getLikesByUser,
    // findLikeId,
  },
} = likesApi;

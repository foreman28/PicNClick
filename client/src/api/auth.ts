import {ForumPost, User} from "@prisma/client";
import {api} from "./apiConfig";

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `/user/all`,
        method: "GET",
      }),
    }),
    getUser: builder.query<User, any>({
      query: (user) => ({
        url: `/user/profile/${user.username}`,
        method: "GET",
      }),
    }),
    login: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: "/user/current",
        method: "GET",
      }),
    }),
  }),
});

export const {useGetAllUsersQuery, useGetUserQuery, useRegisterMutation, useLoginMutation, useCurrentQuery} =
  authApi;

export const {
  endpoints: {getAllUsers, getUser, login, register, current},
} = authApi;

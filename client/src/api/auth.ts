import {User} from "@prisma/client";
import {api} from "./apiConfig";

export type UserData = Omit<User, "id">;
type ResponseLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const {useGetUserQuery, useRegisterMutation, useLoginMutation, useCurrentQuery} =
  authApi;

export const {
  endpoints: {getUser, login, register, current},
} = authApi;

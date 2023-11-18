import { fetchBaseQuery, retry, createApi } from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token || localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    // Добавьте свои маршруты API здесь
    // например:
    // getUser: builder.query<User, number>({
    //   query: (userId) => ({
    //     url: `/users/${userId}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});
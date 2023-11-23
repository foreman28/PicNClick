import { Tags } from "@prisma/client";
import { api } from "./apiConfig";

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<Tags[], void>({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
    }),
    getTag: builder.query<Tags, string>({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "GET",
      }),
    }),
    addTag: builder.mutation<Tags, { name: string }>({
      query: ({ name }) => ({
        url: "/tags/add",
        method: "POST",
        body: { name },
      }),
    }),
    removeTag: builder.mutation<string, string>({
      query: (id) => ({
        url: `/tags/remove/${id}`,
        method: "DELETE",
      }),
    }),
    searchTags: builder.query<Tags[], { search: string }>({
      query: ({ search }) => ({
        url: `/tags?search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useGetTagQuery,
  useAddTagMutation,
  useRemoveTagMutation,
  useSearchTagsQuery,
} = tagsApi;

export const {
  endpoints: {
    getAllTags,
    getTag,
    addTag,
    removeTag,
    searchTags,
  },
} = tagsApi;

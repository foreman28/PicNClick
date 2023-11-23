import { Tags } from "@prisma/client";
import { api } from "./apiConfig";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<Tags[], void>({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
    }),
    getTag: builder.query<Tags, string>({
      query: (url) => ({
        url: `/tags/${url}`,
        method: "GET",
      }),
    }),
    editTag: builder.mutation<string, Tags>({
      query: (tag) => ({
        url: `/tags/edit/${tag.id}`,
        method: "PUT",
        body: tag,
      }),
    }),
    removeTag: builder.mutation<string, string>({
      query: (id) => ({
        url: `/tags/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addTag: builder.mutation<Tags, Tags>({
      query: (tag) => ({
        url: "/tags/add",
        method: "POST",
        body: tag,
      }),
    }),
    searchTags: builder.query<Tags[], { search: string }>({
      query: ({ search }) => ({
        url: `/tags/search?search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useGetTagQuery,
  useEditTagMutation,
  useRemoveTagMutation,
  useAddTagMutation,
  useSearchTagsQuery,
} = postsApi;

export const {
  endpoints: {
    getAllTags,
    getTag,
    editTag,
    removeTag,
    addTag,
    searchTags,
  },
} = postsApi;

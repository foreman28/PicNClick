// postsSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { postsApi } from "../../app/services/posts";
import { RootState } from "../../app/store";
import { ForumPost } from "@prisma/client";

interface InitialState {
  posts: ForumPost[] | null;
}

const initialState: InitialState = {
  posts: null,
};

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(postsApi.endpoints.getAllPosts.matchFulfilled, (state, action) => {
        state.posts = action.payload;
      })
      // Add a new matcher for the searchPosts endpoint
      .addMatcher(postsApi.endpoints.searchPosts.matchFulfilled, (state, action) => {
        state.posts = action.payload;
      });
  },
});

export default slice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;

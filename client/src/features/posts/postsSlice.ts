import { createSlice } from "@reduxjs/toolkit";
import { ForumPost } from "@prisma/client";
import {postsApi} from "../../api/posts";
import {RootState} from "../../store/store";

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
      .addMatcher(postsApi.endpoints.searchPosts.matchFulfilled, (state, action) => {
        state.posts = action.payload;
      });
  },
});

export default slice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;

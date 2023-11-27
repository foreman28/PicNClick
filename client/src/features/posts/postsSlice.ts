import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ForumPost } from "@prisma/client";
import { postsApi } from "../../api/posts";
import { RootState } from "../../store/store";
import {authApi} from "../../api/auth";

interface InitialState {
  posts: ForumPost[] | null;
}

const initialState: InitialState = {
  posts: null,
};

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   postsApi.endpoints.getAllPosts.matchFulfilled,
      //   (state, action: PayloadAction<ForumPost[]>) => {
      //     state.posts = action.payload;
      //   }
      // )
      // .addMatcher(
      //   postsApi.endpoints.searchPosts.matchFulfilled,
      //   (state, action: PayloadAction<ForumPost[]>) => {
      //     state.posts = action.payload;
      //   }
      // )
      .addMatcher(postsApi.endpoints.addPost.matchFulfilled, (state, action) => {
        console.log('ADD POST!!!!!!!')
      })
  },
});

export default slice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;

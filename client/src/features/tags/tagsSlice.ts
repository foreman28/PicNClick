import { createSlice } from "@reduxjs/toolkit";
import { Tags } from "@prisma/client";
import { tagsApi } from "../../api/tags";
import { RootState } from "../../store/store";

interface InitialState {
  tags: Tags[] | null;
}

const initialState: InitialState = {
  tags: null,
};

const slice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(tagsApi.endpoints.getAllTags.matchFulfilled, (state, action) => {
  //       state.tags = action.payload;
  //     });
  //   // Add other matchers for additional tag-related actions if needed
  // },
});

export default slice.reducer;

// export const selectTags = (state: RootState) => state.tags.tags;

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import auth from '../features/auth/authSlice';
import posts from '../features/posts/postsSlice';
import tags from '../features/tags/tagsSlice';
import { listenerMiddleware } from "../middleware/auth";
import {api} from "../api/apiConfig";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    posts,
    tags
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

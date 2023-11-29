import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../auth/types';

const initialState = {
  posts: [] as Post[],
  isLoading: false,
  error: null as Error | null,
};

const postSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    getAllposts(state) {
      state.isLoading = true;
    },
    getAllPostsSuccess(state, action: { payload: { posts: Post[] } }) {
      state.isLoading = false;
      state.posts = action.payload.posts;
    },
    getAllPostsFailure(state, error: { payload: unknown }) {
      state.isLoading = false;
      if (
        typeof error.payload === 'object' &&
        error.payload &&
        'message' in error.payload &&
        typeof error.payload.message === 'string'
      ) {
        state.error = { name: 'Error', message: error.payload.message };
      }
      state.error = { name: 'Error', message: String(error) };
    },
  },
});

export const { getAllposts, getAllPostsSuccess, getAllPostsFailure } =
  postSlice.actions;

export default postSlice.reducer;

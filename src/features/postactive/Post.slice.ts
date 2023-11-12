import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../features/auth/types';

const initialState: { selectedPost: Post | null } = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    selectPost(state, action) {
      state.selectedPost = action.payload;
    },
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
});

export const { selectPost, clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;

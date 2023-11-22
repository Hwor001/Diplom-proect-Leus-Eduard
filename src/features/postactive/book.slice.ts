import { createSlice } from '@reduxjs/toolkit';
import { Response } from '../auth/types';

const initialState = {
  book: [] as Response[],
  isLoading: false,
  error: null as Error | null,
};

const postSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    getBookByIsbn(state) {
      state.isLoading = true;
    },
    getBookSuccess(state, action: { payload: { book: Response[] } }) {
      state.isLoading = false;
      state.book = action.payload.book;
    },
    getBookFailure(state, error: { payload: unknown }) {
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

export const { getBookByIsbn, getBookSuccess, getBookFailure } =
  postSlice.actions;

export default postSlice.reducer;

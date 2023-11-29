import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeachBooks } from '../auth/types';

type popularState = {
  books: SeachBooks | null;
  loading: boolean;
  error: string | null;
  currentIndex: number;
};

const initialState: popularState = {
  books: null,
  loading: false,
  error: null,
  currentIndex: 0,
};

const popularSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    popularBooksStart(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
    },
    popularBooksSuccess(state, action: PayloadAction<SeachBooks>) {
      state.loading = false;
      state.books = action.payload;
      state.error = null;
      state.currentIndex = 0;
    },
    popularBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const {
  popularBooksStart,
  popularBooksSuccess,
  popularBooksFailure,
  setCurrentIndex,
} = popularSlice.actions;

export default popularSlice.reducer;

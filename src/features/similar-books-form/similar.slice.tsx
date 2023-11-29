import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeachBooks } from '../auth/types';

type similarState = {
  books: SeachBooks | null;
  loading: boolean;
  error: string | null;
  currentIndex: number;
};

const initialState: similarState = {
  books: null,
  loading: false,
  error: null,
  currentIndex: 0,
};

const similarSlice = createSlice({
  name: 'similar',
  initialState,
  reducers: {
    similarBooksStart(state, action: PayloadAction<{ searchQuery: string }>) {
      state.loading = true;
    },
    similarBooksSuccess(state, action: PayloadAction<SeachBooks>) {
      state.loading = false;
      state.books = action.payload;
      state.error = null;
      state.currentIndex = 0;
    },
    similarBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload;
    },
  },
});

export const {
  similarBooksStart,
  similarBooksSuccess,
  similarBooksFailure,
  setCurrentIndex,
} = similarSlice.actions;

export default similarSlice.reducer;

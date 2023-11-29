import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeachBooks } from '../../features/auth/types';

type DropdownState = {
  books: SeachBooks | null;
  loading: boolean;
  error: string | null;
};

const initialState: DropdownState = {
  books: null,
  loading: false,
  error: null,
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    fetchBooksStart(
      state,
      action: PayloadAction<{ searchResultsText: string; page: number }>
    ) {
      state.loading = true;
    },
    fetchBooksSuccess(state, action: PayloadAction<SeachBooks>) {
      state.loading = false;
      state.books = action.payload;
      state.error = null;
    },
    fetchBooksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } =
  dropdownSlice.actions;

export default dropdownSlice.reducer;

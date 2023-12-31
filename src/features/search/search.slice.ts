import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeachBooks } from '#features/auth/types';

interface SearchBookState {
  data: SeachBooks | null;
  loading: boolean;
  error: string | null;
  pageCount: number;
}

const initialState: SearchBookState = {
  data: null,
  loading: false,
  error: null,
  pageCount: 0,
};

const searchBookSlice = createSlice({
  name: 'searchBook',
  initialState,
  reducers: {
    getSearchBook: (
      state,
      action: PayloadAction<{ searchText: string; page: number }>
    ) => {
      state.loading = true;
    },
    getSearchBookSuccess: (state, action: PayloadAction<SeachBooks>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getSearchBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSearchBook, getSearchBookSuccess, getSearchBookFailure } =
  searchBookSlice.actions;

export default searchBookSlice.reducer;

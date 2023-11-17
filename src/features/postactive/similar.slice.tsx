import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeachBooks } from '#features/auth/types';

interface AuthState {
  similarBooks: SeachBooks | null;
  currentIndex: number;
}

const initialState: AuthState = {
  similarBooks: null,
  currentIndex: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSimilarBooks: (state, action: PayloadAction<SeachBooks>) => {
      state.similarBooks = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setSimilarBooks, setCurrentIndex } = authSlice.actions;

export default authSlice.reducer;

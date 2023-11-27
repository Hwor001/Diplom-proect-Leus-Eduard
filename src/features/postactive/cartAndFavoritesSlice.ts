import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isFavorites: false,
  isBaskets: false,
};

const cartAndFavoritesSlice = createSlice({
  name: 'cartAndFavorites',
  initialState,
  reducers: {
    setIsFavorites: (state, action: PayloadAction<boolean>) => {
      state.isFavorites = action.payload;
    },
    setIsBaskets: (state, action: PayloadAction<boolean>) => {
      state.isBaskets = action.payload;
    },
  },
});

export const { setIsFavorites, setIsBaskets } = cartAndFavoritesSlice.actions;
export default cartAndFavoritesSlice.reducer;

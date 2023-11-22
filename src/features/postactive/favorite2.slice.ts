import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  favorites: [] as Response[],
  isFavorite: false,
};

const favoritesSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Response[]>) => {
      console.log('setFavorites', action.payload);
      state.favorites = action.payload;
      state.isFavorite = true;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

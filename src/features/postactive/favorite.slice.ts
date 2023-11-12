import { createSlice } from '@reduxjs/toolkit';
import { Response } from '../auth/types';

const initialState = {
  favorites: [] as Response[],
  isFavorite: false,
};

const favoriteBooksSlice = createSlice({
  name: 'favoriteBooks',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      console.log('addToFavorites', action.payload);
      state.favorites.push(action.payload);
      state.isFavorite = true;
    },
    removeFromFavorites(state, action) {
      console.log('removeFromFavorites', action.payload);
      state.favorites = state.favorites.filter(
        (book) => book.isbn13 !== action.payload
      );
      state.isFavorite = false;
    },
  },
});

export const { addToFavorites, removeFromFavorites } =
  favoriteBooksSlice.actions;

export default favoriteBooksSlice.reducer;

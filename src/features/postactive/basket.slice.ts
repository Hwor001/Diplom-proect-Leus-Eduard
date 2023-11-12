import { createSlice } from '@reduxjs/toolkit';
import { Response } from '../auth/types';

const basketSlice = createSlice({
  name: 'book',
  initialState: {
    itemsInCart: [] as Response[],
  },
  reducers: {
    setItemInCart: (state, action) => {
      console.log('setItemInCart', action.payload);
      state.itemsInCart.push(action.payload);
    },
    deleteItemFromCart: (state, action) => {
      console.log('deleteItemFromCart', action.payload);
      state.itemsInCart = state.itemsInCart.filter(
        (book) => book.isbn13 !== action.payload
      );
    },
  },
});

export const { setItemInCart, deleteItemFromCart } = basketSlice.actions;
export default basketSlice.reducer;

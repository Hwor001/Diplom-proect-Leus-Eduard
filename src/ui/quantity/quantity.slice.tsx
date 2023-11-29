import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuantityState {
  [isbn13: string]: number;
}

const initialState: QuantityState = {};

const basketQuantitySlice = createSlice({
  name: 'quantity',
  initialState,
  reducers: {
    setQuantity(
      state,
      action: PayloadAction<{ isbn13: number; quantity: number }>
    ) {
      const { isbn13, quantity } = action.payload;
      state[isbn13] = quantity;
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const isbn13 = action.payload;
      state[isbn13] = (state[isbn13] || 0) + 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const isbn13 = action.payload;
      if (state[isbn13] > 1) {
        state[isbn13] -= 1;
      }
    },
  },
});

export const { setQuantity, increaseQuantity, decreaseQuantity } =
  basketQuantitySlice.actions;
export default basketQuantitySlice.reducer;

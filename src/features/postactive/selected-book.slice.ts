import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from 'typesafe-actions';
import { bookApi } from '../auth/api';
import { Response } from '../auth/types';

interface SelectedState {
  book: Response | null;
  isLoading: boolean;
  error: Error | null;
}

const initialState: SelectedState = {
  book: null,
  isLoading: false,
  error: null,
};

export const getBookByIsbn = createAction(
  'GET_BOOK_BY_ISBN',
  (isbn13: string) => ({ isbn13 })
)();

const selectedSlice = createSlice({
  name: 'SelectedPosts',
  initialState,
  reducers: {
    getBookSuccess(state, action: PayloadAction<Response>) {
      state.isLoading = false;
      state.book = action.payload;
      state.error = null;
    },
    getBookFailure(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.book = null;
      state.error = action.payload;
    },
  },
});

export const { getBookSuccess, getBookFailure } = selectedSlice.actions;

export default selectedSlice.reducer;

export function* watchGetBookByIsbn() {
  yield takeLatest('GET_BOOK_BY_ISBN', fetchBook);
}

function* fetchBook(action: ReturnType<typeof getBookByIsbn>) {
  try {
    const response: Response = yield call(
      bookApi.getBookByIsbn,
      action.payload.isbn13
    );
    yield put(getBookSuccess(response));
  } catch (error) {
    yield put(getBookFailure(error as Error));
  }
}

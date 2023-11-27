import { call, put, takeLatest } from 'redux-saga/effects';
import {
  popularBooksStart,
  popularBooksSuccess,
  popularBooksFailure,
} from './popular.slice';
import { Book, SeachBooks } from '../auth/types';
import { popularBooksApi } from '../auth/api';

interface SearchBooksSuccessPayload {
  error: number;
  page: number;
  total: number;
  books: Book[];
}

function* popularBooks(action: ReturnType<typeof popularBooksStart>) {
  try {
    const { page } = action.payload;
    const data: SeachBooks = yield call(popularBooksApi.fetchBooks, page);

    const successPayload: SearchBooksSuccessPayload = {
      error: data.error,
      page: data.page,
      total: data.total,
      books: data.books,
    };
    yield put(popularBooksSuccess(successPayload));
  } catch (error) {
    yield put(popularBooksFailure(error as string));
  }
}

export function* watchpopularBooks() {
  yield takeLatest(popularBooksStart.type, popularBooks);
}

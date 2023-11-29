import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} from './dropdown.slice';
import { Book, SeachBooks } from '../../features/auth/types';
import { searchBooksApi } from '../../features/auth/api';

interface SearchBooksSuccessPayload {
  error: number;
  page: number;
  total: number;
  books: Book[];
}

function* fetchBooks(action: ReturnType<typeof fetchBooksStart>) {
  try {
    const { searchResultsText, page } = action.payload;
    const data: SeachBooks = yield call(
      searchBooksApi.fetchBooks,
      searchResultsText,
      page
    );

    const successPayload: SearchBooksSuccessPayload = {
      error: data.error,
      page: data.page,
      total: data.total,
      books: data.books,
    };
    yield put(fetchBooksSuccess(successPayload));
  } catch (error) {
    yield put(fetchBooksFailure(error as string));
  }
}

export function* watchFetchBooks() {
  yield takeLatest(fetchBooksStart.type, fetchBooks);
}

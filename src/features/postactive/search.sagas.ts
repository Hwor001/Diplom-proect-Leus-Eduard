import { call, put, takeLatest } from 'redux-saga/effects';
import { searchBookApi } from '../auth/api';
import {
  getSearchBookSuccess,
  getSearchBookFailure,
  getSearchBook,
} from './search.slice';
import { Book, SeachBooks } from '../auth/types';

interface SearchBooksSuccessPayload {
  error: number;
  page: number;
  total: number;
  books: Book[];
}

function* fetchSearchBook(action: ReturnType<typeof getSearchBook>) {
  try {
    const { searchText, page } = action.payload;
    const data: SeachBooks = yield call(
      searchBookApi.searchBooks,
      searchText,
      page
    );

    const successPayload: SearchBooksSuccessPayload = {
      error: data.error,
      page: data.page,
      total: data.total,
      books: data.books,
    };
    yield put(getSearchBookSuccess(successPayload));
  } catch (error) {
    yield put(getSearchBookFailure(error as string));
  }
}

export function* watchSearchBook() {
  yield takeLatest(getSearchBook.type, fetchSearchBook);
}

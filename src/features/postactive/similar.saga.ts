import { call, put, takeLatest } from 'redux-saga/effects';
import {
  similarBooksStart,
  similarBooksSuccess,
  similarBooksFailure,
} from './similar.slice';
import { SeachBooks } from '../auth/types';
import { similarBooksApi } from '../auth/api';

function* similarBooks(action: ReturnType<typeof similarBooksStart>) {
  try {
    const { searchQuery } = action.payload;
    const data: SeachBooks = yield call(
      similarBooksApi.similarBooks,
      searchQuery
    );

    yield put(similarBooksSuccess(data));
  } catch (error) {
    yield put(similarBooksFailure(error as string));
  }
}

export function* watchSimilarBooks() {
  yield takeLatest(similarBooksStart.type, similarBooks);
}

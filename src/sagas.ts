import { all } from 'typed-redux-saga';
import { getAllPostsSaga } from './features/postactive/all-posts.sagas';
import { watchGetBookByIsbn } from './features/postactive/selected-book.slice';
import { watchSearchBook } from '#features/postactive/search.sagas';
import { watchFetchBooks } from '#features/postactive/dropdown.saga';
import { watchpopularBooks } from '#features/postactive/popular.saga';
import { watchSimilarBooks } from '#features/postactive/similar.saga';

export function* rootSaga() {
  yield all([
    getAllPostsSaga(),
    watchGetBookByIsbn(),
    watchSearchBook(),
    watchFetchBooks(),
    watchpopularBooks(),
    watchSimilarBooks(),
  ]);
}

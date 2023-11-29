import { all } from 'typed-redux-saga';
import { getAllPostsSaga } from './features/main-blog/all-posts.sagas';
import { watchGetBookByIsbn } from './features/selected-book/selected-book.slice';
import { watchSearchBook } from '#features/search/search.sagas';
import { watchFetchBooks } from '#ui/drop-down post/dropdown.saga';
import { watchpopularBooks } from '#features/popular-form/popular.saga';
import { watchSimilarBooks } from '#features/similar-books-form/similar.saga';

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

import { all } from 'typed-redux-saga';
import { getAllPostsSaga } from './features/postactive/all-posts.sagas';
import { watchGetBookByIsbn } from './features/postactive/selected-book.slice';
import { watchSearchBook } from '#features/postactive/search.sagas';

export function* rootSaga() {
  yield all([getAllPostsSaga(), watchGetBookByIsbn(), watchSearchBook()]);
}

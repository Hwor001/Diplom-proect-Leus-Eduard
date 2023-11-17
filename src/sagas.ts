import { all } from 'typed-redux-saga';
import { getAllPostsSaga } from './features/postactive/all-posts.sagas';

export function* rootSaga() {
  yield all([getAllPostsSaga()]);
}

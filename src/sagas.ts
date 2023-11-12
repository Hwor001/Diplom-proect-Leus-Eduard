import { all } from 'typed-redux-saga';
import { registerSaga } from './features/auth/registerSaga';
import { getAllPostsSaga } from './features/postactive/all-posts.sagas';

export function* rootSaga() {
  yield all([registerSaga(), getAllPostsSaga()]);
}

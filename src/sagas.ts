import { all } from 'typed-redux-saga';
import { registerSaga } from './features/auth/registerSaga';

export function* rootSaga() {
  yield all([registerSaga()]);
}

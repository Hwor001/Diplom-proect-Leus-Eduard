import { call, put, takeLatest } from 'typed-redux-saga';
import {
  register,
  registerSuccess,
  registerFailure,
} from './registration.slice';
import { api } from './api';

export function* registerSaga() {
  yield takeLatest(register, function* registerHandler({ payload }) {
    const { isOk } = yield* call(api.register, payload);
    if (isOk) {
      yield put(registerSuccess());
    } else {
      yield put(registerFailure());
    }
  });
}

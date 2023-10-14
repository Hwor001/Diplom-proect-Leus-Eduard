import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { signUpFormReducer } from './features/sing-up-form/sing-up-form.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { registrationReducer } from '#features/auth/registration.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  signUpForm: signUpFormReducer,
  registration: registrationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return [...getDefaultMiddleware(), sagaMiddleware];
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

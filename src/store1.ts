import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { signUpFormReducer } from './features/sing-up-form/sing-up-form.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import { registrationReducer } from '#features/auth/registration.slice';
import postsReducer from './features/postactive/all-post.slice';
import postReducer from './features/postactive/Post.slice';
import favoriteBooksReducer from '#features/postactive/favorite.slice';
import basketSlice from '#features/postactive/basket.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  allPosts: postsReducer,
  favoriteBooks: favoriteBooksReducer,
  basketBooks: basketSlice,
  Post: postReducer,
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

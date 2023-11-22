import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { signUpFormReducer } from './features/sing-up-form/sing-up-form.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import postsReducer from './features/postactive/all-post.slice';
import postReducer from './features/postactive/Post.slice';
import favoriteBooksReducer from '#features/postactive/favorite.slice';
import basketReducer from '#features/postactive/basket.slice';
import basketQualityReducer from '#features/postactive/quantity.slice';
import authReducer from '#features/postactive/similar.slice';
import favorite2Reducer from '#features/postactive/favorite2.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  allPosts: postsReducer,
  favoriteBooks: favoriteBooksReducer,
  basketBooks: basketReducer,
  Post: postReducer,
  signUpForm: signUpFormReducer,
  basketQuantity: basketQualityReducer,
  auth: authReducer,
  favorite: favorite2Reducer,
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

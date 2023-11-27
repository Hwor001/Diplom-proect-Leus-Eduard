import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { signUpFormReducer } from './features/sing-up-form/sing-up-form.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import postsReducer from './features/postactive/all-post.slice';
import postReducer from './features/postactive/Post.slice';
import basketQualityReducer from '#features/postactive/quantity.slice';
import similarReducer from '#features/postactive/similar.slice';
import selecteReducer from '#features/postactive/selected-book.slice';
import searchReducer from '#features/postactive/search.slice';
import dropdownReducer from '#features/postactive/dropdown.slice';
import popularReducer from '#features/postactive/popular.slice';
import cartAndFavoritesReducer from '#features/postactive/cartAndFavoritesSlice';
import favoriteReducer from '#features/postactive/favorite.slice';
import basketReducer from '#features/postactive/basket.slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  allPosts: postsReducer,
  Post: postReducer,
  signUpForm: signUpFormReducer,
  basketQuantity: basketQualityReducer,
  similar: similarReducer,
  selected: selecteReducer,
  searchBook: searchReducer,
  dropdown: dropdownReducer,
  popular: popularReducer,
  cartAndFavorites: cartAndFavoritesReducer,
  favorite: favoriteReducer,
  basket: basketReducer,
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

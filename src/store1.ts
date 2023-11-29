import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { signUpFormReducer } from './features/sing-up-form/sing-up-form.slice';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
import postsReducer from './features/main-blog/all-post.slice';
import postReducer from './features/postactive/Post.slice';
import basketQualityReducer from '#ui/quantity/quantity.slice';
import similarReducer from '#features/similar-books-form/similar.slice';
import selecteReducer from '#features/selected-book/selected-book.slice';
import searchReducer from '#features/search/search.slice';
import dropdownReducer from '#ui/drop-down post/dropdown.slice';
import popularReducer from '#features/popular-form/popular.slice';
import cartAndFavoritesReducer from '#features/postactive/cartAndFavoritesSlice';
import favoriteReducer from '#features/favorite-post/favorite.slice';
import basketReducer from '#features/basket-form/basket.slice';

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

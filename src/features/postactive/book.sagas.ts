import { call, put, takeLatest } from 'typed-redux-saga';
import {
  getBookByIsbn,
  getBookSuccess,
  getBookFailure,
} from '../postactive/book.slice';
import { bookApi } from '../auth/api2';
import { Response } from '../auth/types';

export function* bookSaga() {
  yield takeLatest(getBookByIsbn, function* getAllPostsHandler() {
    const response: Response = yield* call(bookApi.getBookByIsbn, 'ваш_ISBN');
    if (response) {
      const mergedPosts = mergePosts([response]);
      yield put(getBookSuccess({ book: mergedPosts }));
    } else {
      yield put(getBookFailure({ error: 'Mocked error message' }));
    }
  });
}

function mergePosts(postsFromApi: Response[]) {
  return postsFromApi.map((element) => {
    return {
      error: element.error,
      image: element.image,
      subtitle: element.subtitle,
      title: element.title,
      price: element.price,
      isbn13: element.isbn13,
      url: element.url,
      authors: element.authors,
      publisher: element.publisher,
      isbn10: element.isbn10,
      pages: element.pages,
      year: element.year,
      rating: element.rating,
      desc: element.desc,
      language: element.language,
      pdf: element.pdf,
      format: element.format,
    };
  });
}

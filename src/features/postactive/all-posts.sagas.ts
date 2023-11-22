import { call, put, takeLatest } from 'typed-redux-saga';
import {
  getAllposts,
  getAllPostsFailure,
  getAllPostsSuccess,
} from '../postactive/all-post.slice';
import { allPostsApi } from '../auth/api';
import { PostsResponse, Book, Post } from '../auth/types';

export function* getAllPostsSaga() {
  yield takeLatest(getAllposts, function* getAllPostsHandler() {
    const response: PostsResponse = yield* call(allPostsApi.getAllPosts);

    if (response) {
      const mergedPosts = mergePosts(response.books);
      yield put(getAllPostsSuccess({ posts: mergedPosts }));
    } else {
      yield put(getAllPostsFailure({ error: 'Mocked error message' }));
    }
  });
}

function mergePosts(postsFromApi: Book[]): Post[] {
  return postsFromApi.map((element) => {
    return {
      image: element.image,
      subtitle: element.subtitle,
      title: element.title,
      price: element.price,
      isbn13: element.isbn13,
      url: element.url,
    };
  });
}

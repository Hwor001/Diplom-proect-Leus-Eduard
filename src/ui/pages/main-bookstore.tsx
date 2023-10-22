import { MainTemplate } from '#ui/templates/main-template';
import { Backlink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { MainBookStoreForm } from '#features/main-blog/maim-bookstore-form';
import { allPosts } from '../../Posts';
import { useAppDispatch, useAppSelector } from '#hooks';

import {
  getAllPostsFailure,
  getAllPostsSuccess,
  getAllposts,
} from '../../features/postactive/all-post.slice';
import { useEffect } from 'react';

export const MainBookStore: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector(({ allPosts }) => allPosts);
  useEffect(() => {
    dispatch(getAllposts());
  }, [dispatch]);

  useEffect(() => {
    const timedId = setTimeout(() => {
      if (Math.random() < 0.5) {
        dispatch(getAllPostsSuccess({ posts: allPosts }));
      } else {
        dispatch(
          getAllPostsFailure({ name: 'Error', message: 'SERVER ERROR' })
        );
      }
    }, 3000);
    return () => {
      clearTimeout(timedId);
    };
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.length === 0) {
    return <div>Постов нет</div>;
  }
  return (
    <MainTemplate
      header={<Header />}
      backLink={<Backlink />}
      title={<Title2>New Releases Books</Title2>}
      body={<MainBookStoreForm posts={posts} />}
    />
  );
};

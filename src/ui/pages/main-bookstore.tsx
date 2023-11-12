import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { MainBookStoreForm } from '#features/main-blog/maim-bookstore-form';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getAllposts } from '../../features/postactive/all-post.slice';
import { useEffect } from 'react';
import { Response } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  response: Response;
}

export const MainBookStore: React.FC<Props> = ({ handleSearch, response }) => {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector(({ allPosts }) => allPosts);
  useEffect(() => {
    dispatch(getAllposts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.length === 0) {
    return <div>Постов нет</div>;
  }
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      backLink={<BackLink />}
      title={<Title2>New Releases Books</Title2>}
      body={<MainBookStoreForm posts={posts} response={response} />}
    />
  );
};

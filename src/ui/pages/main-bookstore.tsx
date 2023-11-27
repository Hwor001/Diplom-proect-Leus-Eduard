import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { MainBookStoreForm } from '#features/main-blog/maim-bookstore-form';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getAllposts } from '../../features/postactive/all-post.slice';
import { useEffect } from 'react';
import { Response, SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const MainBookStore: React.FC<Props> = ({ handleSearch, post }) => {
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
      header={<Header handleSearch={handleSearch} post={post} />}
      backLink={<BackLink />}
      title={<Title>New Releases Books</Title>}
      body={<MainBookStoreForm posts={posts} />}
    />
  );
};

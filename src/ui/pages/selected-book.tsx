import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { SelectedBookForm } from '#features/selected-book/selected-book-form';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getBookByIsbn } from '../../features/selected-book/selected-book.slice';

interface Props {
  handleSearch: (searchText: string) => void;
  title: string;
  post: SeachBooks;
}

export const SelectedBook: React.FC<Props> = ({
  handleSearch,
  title,
  post,
}) => {
  const { isbn13 } = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { book, isLoading, error } = useAppSelector((state) => state.selected);

  useEffect(() => {
    if (isbn13) {
      dispatch(getBookByIsbn(isbn13));
    }
    window.scrollTo(0, 0);
  }, [dispatch, isbn13, pathname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!book) {
    return <div>No book found</div>;
  }

  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      backLink={<BackLink />}
      title={<Title>{book.title}</Title>}
      body={<SelectedBookForm response={book} title={book.title} />}
    />
  );
};

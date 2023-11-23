import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { SelectedBookForm } from '#features/selected-book/selected-book-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getBookByIsbn } from '../../features/postactive/selected-book.slice';

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
  const dispatch = useAppDispatch();
  const { book, isLoading, error } = useAppSelector((state) => state.selected);

  useEffect(() => {
    if (isbn13) {
      dispatch(getBookByIsbn(isbn13));
    }
  }, [dispatch, isbn13]);

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
      title={<Title2>{book.title}</Title2>}
      body={<SelectedBookForm response={book} title={book.title} />}
    />
  );
};

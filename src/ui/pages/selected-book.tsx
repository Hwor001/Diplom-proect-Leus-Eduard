import { MainTemplate } from '#ui/templates/main-template';
import { BackLink } from '../../features/back-link/back-link';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { SelectedBookForm } from '#features/selected-book/selected-book-form';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Response, SeachBooks } from '#features/auth/types';

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
  const [book, setBook] = useState<Response | null>(null);

  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
      .then((res) => res.json())
      .then((data: Response) => setBook(data));
  }, [isbn13]);

  if (!book) {
    return <div>Loading...</div>;
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

import { MainTemplate } from '#ui/templates/main-template';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { SearchBookForm } from '#features/search/search-book-form';
import { useState, useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  searchResultsText: string;
  post: SeachBooks;
}

export const SearchBook: React.FC<Props> = ({
  handleSearch,
  searchResultsText,
  post,
}) => {
  const [books, setBooks] = useState<SeachBooks | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.itbook.store/1.0/search/${searchResultsText}/${page}`
      );
      const data: SeachBooks = await response.json();
      setBooks(data);
      console.log(data);
      setPageCount(Math.ceil(data.total / 10));
    };
    fetchData();
  }, [searchResultsText, page]);

  if (!books) {
    return <div>Loading...</div>;
  }

  const onPageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      title={<Title2>{searchResultsText} Search results</Title2>}
      body={
        <SearchBookForm
          response={books}
          pageCount={pageCount}
          currentPage={page}
          onPageChange={onPageChange}
        />
      }
    />
  );
};

import { MainTemplate } from '#ui/templates/main-template';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { SearchBookForm } from '#features/search/search-book-form';
import { useState, useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getSearchBook } from '#features/postactive/search.slice';

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
  const dispatch = useAppDispatch();
  const {
    data: books,
    loading,
    error,
  } = useAppSelector((state) => state.searchBook) || {
    data: null,
    loading: false,
    error: null,
  };
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);

  useEffect(() => {
    if (searchResultsText) {
      dispatch(getSearchBook({ searchText: searchResultsText, page }));
      const totalPages = Math.ceil(books?.total || 0 / 10);
      setPageCount(totalPages <= 100 ? totalPages : 100);
    }
  }, [dispatch, searchResultsText, page, books?.total]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books) {
    return <div>No books found</div>;
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

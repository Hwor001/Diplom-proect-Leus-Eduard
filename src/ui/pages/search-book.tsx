import { MainTemplate } from '#ui/templates/main-template';
import { Title } from '#ui/title/title';
import Header from '#ui/header/header';
import { SearchBookForm } from '#features/search/search-book-form';
import { useState, useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';
import { useAppDispatch, useAppSelector } from '#hooks';
import { getSearchBook } from '#features/postactive/search.slice';
import { useNavigate, useParams } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);

  useEffect(() => {
    if (searchResultsText) {
      dispatch(
        getSearchBook({ searchText: searchResultsText, page: currentPage })
      );
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

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    navigate(`/search/${searchResultsText}/${newPage}`);
  };

  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} post={post} />}
      title={<Title>{searchResultsText} Search results</Title>}
      body={
        <SearchBookForm
          response={books}
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      }
    />
  );
};

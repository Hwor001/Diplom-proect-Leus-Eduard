import { MainTemplate } from '#ui/templates/main-template';
import { Title2 } from '#ui/title/title2';
import Header from '#ui/header/header';
import { SearchBookForm } from '#features/search/search-book-form';
import { useState, useEffect } from 'react';
import { SeachBooks } from '#features/auth/types';
// import { useSearchParams } from 'react-router-dom';

interface Props {
  handleSearch: (searchText: string) => void;
  searchResultsText: string;
}

export const SearchBook: React.FC<Props> = ({
  handleSearch,
  searchResultsText,
}) => {
  const [books, setBooks] = useState<SeachBooks | null>(null);
  //   const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  //   const postQuery = searchParams.get('search');
  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/search/${searchResultsText}/${page}`)
      .then((res) => res.json())
      .then((data: SeachBooks) => setBooks(data));
  }, [searchResultsText, setPage]);
  if (!books) {
    return <div>Loading...</div>;
  }
  return (
    <MainTemplate
      header={<Header handleSearch={handleSearch} />}
      title={<Title2>{searchResultsText} Search results</Title2>}
      body={<SearchBookForm response={books} />}
    />
  );
};

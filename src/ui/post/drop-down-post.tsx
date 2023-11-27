import styled from 'styled-components';
import { SeachBooks } from '#features/auth/types';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '#hooks';
import { fetchBooksStart } from '#features/postactive/dropdown.slice';

type DropDownProps = {
  searchResultsText: string;
  post: SeachBooks;
};

export const DropDown: React.FC<DropDownProps> = ({
  searchResultsText,
  post,
}) => {
  const dispatch = useAppDispatch();
  const { books, error } = useAppSelector((state) => state.dropdown);

  useEffect(() => {
    if (searchResultsText.trim() !== '') {
      dispatch(fetchBooksStart({ searchResultsText, page: 1 }));
    }
  }, [dispatch, searchResultsText]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books || !books.books) {
    return null;
  }

  const booksToShow = books.books.slice(0, 5);

  return (
    <DropDownWrapper>
      {booksToShow.map((book, index) => (
        <DropDownElement key={index}>
          <TitleLink to={`/books/${book.isbn13}`}>
            <PostImg>
              <img src={book.image} alt={`Post ${book.isbn13}`} />
            </PostImg>
            <TitleWrapper>{book.title}</TitleWrapper>
          </TitleLink>
        </DropDownElement>
      ))}
    </DropDownWrapper>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostImg = styled.div`
  & img {
    width: 51px;
    height: 60px;
  }
`;

const DropDownWrapper = styled.div`
  position: absolute;
  width: 542px;
  background: #e7e7e7;
  transform: translate(-50%, 79px);
  left: 50.8%;
  z-index: 2;
`;

const DropDownElement = styled.div`
  & a {
    display: flex;
  }
`;

const TitleLink = styled(Link)`
  border: 2px solid transparent;
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
    color: #007bff;
    border: 2px solid #007bff;
  }
`;

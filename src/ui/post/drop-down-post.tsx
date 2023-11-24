import styled from 'styled-components';
import { SeachBooks } from '#features/auth/types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

type DropDownProps = {
  searchResultsText: string;
  post: SeachBooks;
};

export const DropDown: React.FC<DropDownProps> = ({
  searchResultsText,
  post,
}) => {
  const [books, setBooks] = useState<SeachBooks | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.itbook.store/1.0/search/${searchResultsText}`
        );
        const data: SeachBooks = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchResultsText.trim() !== '') {
      fetchData();
    }
  }, [searchResultsText]);

  if (!books) {
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

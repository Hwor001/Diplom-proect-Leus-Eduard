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
          <Link to={`/books/${book.isbn13}`}>
            <PostImg>
              <img src={book.image} alt={`Post ${book.isbn13}`} />
            </PostImg>
            <TitleWrapper>{book.title}</TitleWrapper>
          </Link>
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
  width: 540px;
  background: #e7e7e7;
  transform: translate(251px, 80px);
`;

const DropDownElement = styled.div`
  & a {
    display: flex;
  }
`;

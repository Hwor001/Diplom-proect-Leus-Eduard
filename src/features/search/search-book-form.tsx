import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { SeachBooks } from '#features/auth/types';
import { PaginationSearch } from '#ui/pagination/pagination-search';

interface BookProps {
  response: SeachBooks;
}

export const SearchBookForm: React.FC<
  BookProps & {
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
> = ({ response, pageCount, currentPage, onPageChange }) => {
  return (
    <AllWrapper>
      <MainBookStoreWrapper>
        {response.books.map((book, index) => (
          <PostsWrapper key={index}>
            <ImgLink to={`/books/${book.isbn13}`}>
              <PostImg>
                <img src={book.image} alt={`Post ${book.isbn13}`} />
              </PostImg>
            </ImgLink>
            <TitleLink to={`/books/${book.isbn13}`}>
              <TitleWrapper>{book.title}</TitleWrapper>
            </TitleLink>
          </PostsWrapper>
        ))}
      </MainBookStoreWrapper>
      <PaginationSearch
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const MainBookStoreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  & > :last-child {
    grid-column: span 3;
    justify-self: center;
  }
`;

const PostsWrapper = styled.div`
  width: 352px;
  height: auto;
`;

const TitleWrapper = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const PostImg = styled.div`
  text-align: center;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

const ImgLink = styled(Link)`
  & img {
    border: 2px solid transparent;
  }

  &:hover img {
    border: 2px solid #007bff;
  }
`;

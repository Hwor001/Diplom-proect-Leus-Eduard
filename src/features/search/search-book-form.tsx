import { styled } from 'styled-components';
import { NewsLetter } from '#features/newsletter/newsletter-form';
import { Link } from 'react-router-dom';
import { SeachBooks } from '#features/auth/types';

interface BookProps {
  response: SeachBooks;
}

export const SearchBookForm: React.FC<BookProps> = ({ response }) => {
  return (
    <AllWrapper>
      <MainBookStoreWrapper>
        {response.books.map((book, index) => (
          <PostsWrapper key={index}>
            <Link to={`/books/${book.isbn13}`}>
              <PostImg>
                <img src={book.image} alt={`Post ${book.isbn13}`} />
              </PostImg>
              <TitleWrapper>{book.title}</TitleWrapper>
            </Link>
          </PostsWrapper>
        ))}
      </MainBookStoreWrapper>
      <NewsLetter />
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const MainBookStoreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const PostsWrapper = styled.div`
  //   width: 352px;
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

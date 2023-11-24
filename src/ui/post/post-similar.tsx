import { styled } from 'styled-components';
import { SeachBooks } from '#features/auth/types';
import { Link } from 'react-router-dom';

interface PostProps {
  response: SeachBooks;
  currentIndex: number;
}

export const PostsSimilar: React.FC<PostProps> = ({
  response,
  currentIndex,
}) => {
  const endIndex = currentIndex + 3;
  return (
    <PostsSimilarWrapper>
      {response.books.slice(currentIndex, endIndex).map((book, index) => (
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
    </PostsSimilarWrapper>
  );
};

const PostsSimilarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PostsWrapper = styled.div`
  width: 352px;
  height: auto;
  padding: 0 10px;
`;

const TitleWrapper = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const PostImg = styled.div`
  text-align: center;

  & img {
    width: 100%;
    height: auto;
    transition: border 0.3s;
  }
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

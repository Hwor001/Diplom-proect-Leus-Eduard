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
          <PostImg>
            <img src={book.image} alt={`Post ${book.isbn13}`} />
          </PostImg>
          <Link to={`/books/${book.isbn13}`}>
            <TitleWrapper>{book.title}</TitleWrapper>
          </Link>
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
`;

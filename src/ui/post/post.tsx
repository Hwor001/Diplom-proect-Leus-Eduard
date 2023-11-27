import { styled } from 'styled-components';
import { Post, Response } from '#features/auth/types';
import { Link } from 'react-router-dom';

interface PostProps {
  post: Post;
  // response: Response;
}

export const Posts: React.FC<PostProps> = ({ post }) => {
  return (
    <PostsWrapper>
      <ImgLink to={`/books/${post.isbn13}`}>
        <PostImg>
          {<img src={post.image} alt={`Post ${post.isbn13}`} />}
        </PostImg>
      </ImgLink>
      <TitleLink to={`/books/${post.isbn13}`}>
        <TitleWrapper>{post.title}</TitleWrapper>
      </TitleLink>
    </PostsWrapper>
  );
};

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

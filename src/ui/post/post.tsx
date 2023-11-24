import { styled } from 'styled-components';
import { Post, Response } from '#features/auth/types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { StarRatingForm } from '#features/starRating/starRating';

// interface StarRatingProps {
//   rating: number;
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const halfStar = rating - fullStars >= 1;

//   const stars = [];
//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<FontAwesomeIcon key={i} icon={fasFaStar} />);
//   }
//   if (halfStar) {
//     stars.push(<FontAwesomeIcon key="half" icon={faStar} />);
//   }
//   for (let i = stars.length; i < 5; i++) {
//     stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
//   }

//   return <StarWrapper>{stars}</StarWrapper>;
// };

interface PostProps {
  post: Post;
  response: Response;
}

export const Posts: React.FC<PostProps> = ({ post, response }) => {
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
      {/* <StarRatingForm response={response} /> */}
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

// const StarWrapper = styled.div`
//   & svg {
//     width: 14px;
//     height: 13px;
//   }
// `;

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

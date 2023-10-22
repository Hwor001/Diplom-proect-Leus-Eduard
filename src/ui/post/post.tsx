import { styled } from 'styled-components';
import { Post } from '#features/auth/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 1;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={fasFaStar} />);
  }
  if (halfStar) {
    stars.push(<FontAwesomeIcon key="half" icon={faStar} />);
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }

  return <StarWrapper>{stars}</StarWrapper>;
};

interface PostProps {
  post: Post;
}

export const Posts: React.FC<PostProps> = (PostProps) => {
  return (
    <PostsWrapper>
      <PostImg>
        {<img src={PostProps.post.image} alt={`Post ${PostProps.post.id}`} />}
      </PostImg>
      <TitleWrapper>{PostProps.post.title}</TitleWrapper>
      <AuthorPublisherPublishedWrapper>
        by {PostProps.post.authors}. {PostProps.post.publisher}{' '}
        {PostProps.post.year}
      </AuthorPublisherPublishedWrapper>
      <PriceWraper>
        {PostProps.post.price}
        <StarRating rating={PostProps.post.rating} />
      </PriceWraper>
    </PostsWrapper>
  );
};

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

const PriceWraper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const StarWrapper = styled.div`
  & svg {
    width: 14px;
    height: 13px;
  }
`;

const AuthorPublisherPublishedWrapper = styled.p`
  font-family: 'Archivo';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const PostImg = styled.div`
  text-align: center;
`;

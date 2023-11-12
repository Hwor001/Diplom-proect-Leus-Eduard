import { Response } from '#features/auth/types';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { RootState, store } from '../../store1';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '#ui/button/button';
import { deleteItemFromCart } from '../../features/postactive/basket.slice';

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

interface BookProps {
  response: Response;
}

export const BasketBook: React.FC<BookProps> = ({ response }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state: RootState) => state.basketBooks.itemsInCart
  );
  const Deleted = (element: Response) => {
    dispatch(deleteItemFromCart(element.isbn13));
    console.log('After dispatch:', store.getState());
  };
  return (
    <>
      {items.length > 0
        ? items.map((element: Response) => (
            <PostsWrapper key={element.isbn13}>
              <PostImg>
                {<img src={element.image} alt={`Post ${element.isbn13}`} />}
              </PostImg>
              <Link to={`/books/${element.isbn13}`}>
                <TitleWrapper>{element.title}</TitleWrapper>
              </Link>
              <AuthorPublisherPublishedWrapper>
                {`by ${element.authors}. ${element.publisher} ${element.year}`}
              </AuthorPublisherPublishedWrapper>
              <PriceWraper>
                {element.price}
                <StarRating rating={element.rating} />
              </PriceWraper>
              <Button variant="primary" onClick={() => Deleted(element)}>
                Deleted
              </Button>
            </PostsWrapper>
          ))
        : 'Корзина пуста'}
    </>
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

const PostImg = styled.div`
  text-align: center;
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

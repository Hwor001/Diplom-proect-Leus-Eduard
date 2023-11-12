import styled from 'styled-components';
import { Response } from '#features/auth/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as fasFaStar,
  faEllipsis,
  faHeart as fasHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { TabsSelectedBook } from '#features/tabs-active/tabs-selected-book';
import { NewsLetter } from '#features/newsletter/newsletter-form';
import { Button } from '#ui/button/button';
import { Button2 } from '#ui/button/button2';
import { Button4 } from '#ui/button/button4';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/postactive/favorite.slice';
import {
  setItemInCart,
  deleteItemFromCart,
} from '../../features/postactive/basket.slice';
import { RootState, store } from '../../store1';

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

export const SelectedBookForm: React.FC<BookProps> = ({ response }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favoriteBooks.favorites.some(
      (book) => book.isbn13 === response.isbn13
    )
  );
  const items = useSelector(
    (state: RootState) => state.basketBooks.itemsInCart
  );
  const isItemInCart = items.some((item) => item.isbn13 === response.isbn13);

  const addToCart = () => {
    console.log('response', response);
    if (isItemInCart) {
      dispatch(deleteItemFromCart(response.isbn13));
    } else {
      dispatch(setItemInCart(response));
    }
  };
  const PreviewBook = () => {};
  const Facebook = () => {};
  const Twiter = () => {};
  const more = () => {};
  const Heart = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(response.isbn13));
    } else {
      dispatch(addToFavorites(response));
    }
    console.log('After dispatch:', store.getState());
  };
  return (
    <SelectedBookWrapper>
      <MainBookStoreWrapper>
        <>
          <ImageAndInfoBookWrapper>
            <ImageWrapper>
              {<img src={response.image} alt={`Post ${response.isbn13}`} />}
            </ImageWrapper>
            <ButtonWrapper>
              <Button4 onClick={Heart}>
                <FontAwesomeIcon icon={isFavorite ? fasHeart : faHeart} />{' '}
              </Button4>
            </ButtonWrapper>
            <InfoWrapper>
              <PriceWrapper>
                <MoneyWrapper>{response.price}</MoneyWrapper>
                <StarRating rating={response.rating} />
              </PriceWrapper>
              <DopInfoWrapper>
                <TextWrapper>
                  Authors
                  <br /> Publisher
                  <br /> Published
                  <br /> Pages
                  <br /> Language
                  <br /> Format
                  <br /> ISBN-10
                  <br /> ISBN-13
                </TextWrapper>
                <Text2Wrapper>
                  {response.authors}
                  <br />
                  {response.publisher}
                  <br />
                  {response.year}
                  <br />
                  {response.pages}
                  <br />
                  {response.language}
                  <br />
                  Paper book / ebook (PDF)
                  <br />
                  {response.isbn10}
                  <br />
                  {response.isbn13}
                </Text2Wrapper>
              </DopInfoWrapper>
              <Button variant="primary" onClick={addToCart}>
                add to cart
              </Button>
              <Button2 onClick={PreviewBook}>Preview book</Button2>
            </InfoWrapper>
          </ImageAndInfoBookWrapper>
          <TabsSelectedBook book={response} />
          <ButtonWraper>
            <Button4 onClick={Facebook}>
              <FontAwesomeIcon icon={faFacebookF} />
            </Button4>
            <Button4 onClick={Twiter}>
              <FontAwesomeIcon icon={faTwitter} />
            </Button4>
            <Button4 onClick={more}>
              <FontAwesomeIcon icon={faEllipsis} />
            </Button4>
          </ButtonWraper>
          <NewsLetter />
        </>
      </MainBookStoreWrapper>
    </SelectedBookWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: absolute;
  background: white;
  transform: translate3d(-148px, 25px, 10px);
`;

const SelectedBookWrapper = styled.div``;

const MainBookStoreWrapper = styled.div``;

const ImageAndInfoBookWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div``;

const ButtonWraper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  width: 448px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StarWrapper = styled.div``;

const MoneyWrapper = styled.div``;

const DopInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  white-space: pre-line;
  color: #a8a8a8;
`;

const Text2Wrapper = styled.div`
  white-space: pre-line;
`;

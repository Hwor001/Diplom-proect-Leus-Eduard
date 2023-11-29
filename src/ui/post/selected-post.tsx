import styled from 'styled-components';
import { Response } from '#features/auth/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setQuantity } from '../quantity/quantity.slice';
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
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ref, set, remove, get } from 'firebase/database';
import { SimilarBoookForm } from '#features/similar-books-form/similar-books-form';
import { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';
import {
  setIsFavorites,
  setIsBaskets,
} from '../../features/postactive/cartAndFavoritesSlice';
import {
  setItemInCart,
  deleteItemFromCart,
} from '../../features/basket-form/basket.slice';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorite-post/favorite.slice';

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
  title: string;
}

export const SelectedPosts: React.FC<BookProps> = ({ response }) => {
  const dispatch = useAppDispatch();
  const { isFavorites, isBaskets } = useAppSelector(
    (state) => state.cartAndFavorites
  );
  const isFavorite = useAppSelector((state) =>
    state.favorite.favorites.some((book) => book.isbn13 === response.isbn13)
  );
  const isBasket = useAppSelector((state) =>
    state.basket.itemsInCart.some((book) => book.isbn13 === response.isbn13)
  );
  const quantity = useAppSelector(
    (state) => state.basketQuantity[response.isbn13] || 0
  );
  const [userName, setUserName] = useState('');

  function truncateText(title: string, maxChars: number): string {
    if (title.length <= maxChars) {
      return title;
    }
    const truncatedText = title.substring(0, maxChars);
    return `${truncatedText}...`;
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      } else {
        setUserName('');
      }
    });

    const favoritesRef = ref(
      database,
      `users/${userName}/favorites/${response.isbn13}`
    );
    const basketRef = ref(
      database,
      `users/${userName}/basket/${response.isbn13}`
    );

    get(favoritesRef)
      .then((snapshot) => {
        dispatch(setIsFavorites(snapshot.exists()));
      })
      .catch((error) => {
        console.error('Error fetching favorites from database:', error);
      });

    get(basketRef)
      .then((snapshot) => {
        dispatch(setIsBaskets(snapshot.exists()));
      })
      .catch((error) => {
        console.error('Error fetching basket from database:', error);
      });
  }, [response.isbn13, userName, dispatch]);

  const addToCart = async () => {
    const updatedQuantity = isBasket ? quantity - 1 : 1;
    dispatch(
      setQuantity({ isbn13: response.isbn13, quantity: updatedQuantity })
    );
    const basketRef = ref(
      database,
      `users/${userName}/basket/${response.isbn13}`
    );
    try {
      if (isBasket) {
        dispatch(deleteItemFromCart(response.isbn13));
        await remove(basketRef)
          .then(() => {
            console.log('Remove from database successful');
          })
          .catch((error) => {
            console.error('Error removing from database:', error);
          });
      } else {
        dispatch(setItemInCart(response));
        await set(basketRef, {
          title: response.title,
          error: response.error,
          subtitle: response.subtitle,
          authors: response.authors,
          publisher: response.publisher,
          isbn10: response.isbn10,
          isbn13: response.isbn13,
          pages: response.pages,
          year: response.year,
          rating: response.rating,
          desc: response.desc,
          price: response.price,
          image: response.image,
          url: response.url,
          language: response.language,
        })
          .then(() => {
            console.log('Write to database successful');
          })
          .catch((error) => {
            console.error('Error writing to database:', error);
          });
      }
      dispatch(setIsBaskets(!isBasket));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const Facebook = () => {};
  const Twiter = () => {};
  const more = () => {};

  const Heart = async () => {
    const favoritesRef = ref(
      database,
      `users/${userName}/favorites/${response.isbn13}`
    );
    try {
      if (isFavorite) {
        dispatch(removeFromFavorites(response.isbn13));
        await remove(favoritesRef)
          .then(() => {
            console.log('Remove from database successful');
          })
          .catch((error) => {
            console.error('Error removing from database:', error);
          });
      } else {
        dispatch(addToFavorites(response));
        await set(favoritesRef, {
          title: response.title,
          error: response.error,
          subtitle: response.subtitle,
          authors: response.authors,
          publisher: response.publisher,
          isbn10: response.isbn10,
          isbn13: response.isbn13,
          pages: response.pages,
          year: response.year,
          rating: response.rating,
          desc: response.desc,
          price: response.price,
          image: response.image,
          url: response.url,
          language: response.language,
        })
          .then(() => {
            console.log('Write to database successful');
          })
          .catch((error) => {
            console.error('Error writing to database:', error);
          });
      }
      dispatch(setIsFavorites(!isFavorite));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  return (
    <AllWrapper>
      <ImageAndInfoBookWrapper>
        <ImageWrapper>
          {<img src={response.image} alt={`Post ${response.isbn13}`} />}
        </ImageWrapper>
        <FontWrapper>
          <FontAwesomeIcon
            onClick={Heart}
            icon={isFavorite || isFavorites ? fasHeart : faHeart}
          />{' '}
        </FontWrapper>
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
              {truncateText(response.authors, 20)}
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
            {isBasket || isBaskets ? 'Remove from cart' : 'Add to cart'}
          </Button>
        </InfoWrapper>
      </ImageAndInfoBookWrapper>
      <TabsSelectedBook book={response} />
      <FontsWrapper>
        <FontAwesomeIcon onClick={Facebook} icon={faFacebookF} />
        <FontAwesomeIcon onClick={Twiter} icon={faTwitter} />
        <FontAwesomeIcon onClick={more} icon={faEllipsis} />
      </FontsWrapper>
      <NewsLetter />
      <SimilarBoookForm title={response.title} />
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const FontWrapper = styled.div`
  position: absolute;
  background: white;
  padding: 16px;
  transform: translate(40%, 15%);
  z-index: 1;
  cursor: pointer;

  & svg {
    width: 18px;
    height: 16px;
  }
  &:hover {
    background-color: silver;
  }
`;

const ImageWrapper = styled.div`
  width: 544px;
  height: 472px;

  & img {
    transform: translate(40%, 15%);
  }
`;

const FontsWrapper = styled.div`
  display: flex;

  & svg {
    padding: 16px;
    cursor: pointer;
  }
`;

const ImageAndInfoBookWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  width: 448px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & button {
    width: -webkit-fill-available;
    margin-bottom: 40px;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;
`;

const MoneyWrapper = styled.div`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const DopInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  white-space: pre-line;
  color: #a8a8a8;
  font-family: 'Helios';
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
`;

const Text2Wrapper = styled.div`
  white-space: pre-line;
  font-family: 'Helios';
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
`;

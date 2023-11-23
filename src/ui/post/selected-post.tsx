import styled from 'styled-components';
import { Response } from '#features/auth/types';
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
import { setQuantity } from '../../features/postactive/quantity.slice';
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
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { getDatabase, ref, set, remove } from 'firebase/database';
import { SimilarBoookForm } from '#features/similar-books-form/similar-books-form';
import { useState, useEffect } from 'react';
import { auth, database } from '../../firebase';

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
  const quantity = useSelector(
    (state: RootState) => state.basketQuantity[response.isbn13] || 0
  );
  const [userName, setUserName] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      }
    });
  }, []);

  const addToCart = () => {
    console.log('response', response);
    const updatedQuantity = isItemInCart ? quantity - 1 : 1;
    dispatch(
      setQuantity({ isbn13: response.isbn13, quantity: updatedQuantity })
    );
    if (isItemInCart) {
      dispatch(deleteItemFromCart(response.isbn13));
      const basketRef = ref(
        database,
        `users/${userName}/basket/${response.isbn13}`
      );
      remove(basketRef)
        .then(() => {
          console.log('Remove from database successful');
        })
        .catch((error) => {
          console.error('Error removing from database:', error);
        });
    } else {
      dispatch(setItemInCart(response));
      const basketRef = ref(
        database,
        `users/${userName}/basket/${response.isbn13}`
      );
      set(basketRef, {
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
  };
  const PreviewBook = () => {};
  const Facebook = () => {};
  const Twiter = () => {};
  const more = () => {};
  const Heart = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(response.isbn13));
      const favoritesRef = ref(
        database,
        `users/${userName}/favorites/${response.isbn13}`
      );
      remove(favoritesRef)
        .then(() => {
          console.log('Remove from database successful');
        })
        .catch((error) => {
          console.error('Error removing from database:', error);
        });
    } else {
      dispatch(addToFavorites(response));
      const favoritesRef = ref(
        database,
        `users/${userName}/favorites/${response.isbn13}`
      );
      set(favoritesRef, {
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
    console.log('After dispatch:', store.getState());
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
            icon={isFavorite ? fasHeart : faHeart}
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
  // transform: translate3d(-148px, 25px, 10px);
  transform: translate(40%, 15%);

  & svg {
    cursor: pointer;
    width: 18px;
    height: 16px;
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
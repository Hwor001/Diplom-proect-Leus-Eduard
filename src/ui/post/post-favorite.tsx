import { Response } from '#features/auth/types';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as fasFaStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { RootState, store } from '../../store1';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../features/postactive/favorite.slice';
import { PopularBookForm } from '#features/popular-form/popular-form';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { auth } from '../../firebase';
import { database } from '../../firebase';
// import { setFavorites } from '../../features/postactive/favorite2.slice';

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

export const FavoriteBook: React.FC<BookProps> = ({ response }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<Response[]>([]);
  const items = useSelector(
    (state: RootState) => state.favoriteBooks.favorites
  );
  const [userName, setUserName] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
        if (displayName) {
          const favoritesRef = ref(
            database,
            `users/${userName}/favorites/${response.isbn13}`
          );
          get(favoritesRef)
            .then((snapshot) => {
              console.log('Snapshot value:', snapshot.val()); // Log the snapshot value

              if (snapshot.exists()) {
                const userArray = Object.entries(snapshot.val()).map(
                  ([isbn13, data]: [string, unknown]) => ({
                    isbn13: Number(isbn13),
                    ...(data as Record<string, unknown>),
                  })
                );
                console.log('User array:', userArray); // Log the userArray
                setUsers((userArray) => userArray);
              } else {
                console.log('No data available');
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error); // Log any errors
            });

          // onValue(favoritesRef, (snapshot) => {
          //   const favoritesArray: Response[] = [];

          //   snapshot.forEach((childSnapshot) => {
          //     const isbn13 = childSnapshot.key;
          //     const data = childSnapshot.val();
          //     const book: Response = { isbn13, ...data };
          //     favoritesArray.push(book);
          //   });
          //   console.log(favoritesArray);
          //   // dispatch(setFavorites(favoritesArray as Response[]));
          // });
        }
      }
    });
  }, []);

  const handleDelete = (element: Response) => {
    dispatch(removeFromFavorites(element.isbn13));
    console.log('After dispatch:', store.getState());
  };

  return (
    <>
      {items.length > 0
        ? items.map((element) => (
            <PostsWrapper key={element.isbn13}>
              <ImgInfoWrapper>
                <PostImg>
                  {<img src={element.image} alt={`Post ${element.isbn13}`} />}
                </PostImg>
                <Infowrapper>
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
                </Infowrapper>
              </ImgInfoWrapper>
              <FontAwesomeIconWrapper>
                <FontWrapper>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(element)}
                    icon={faHeart}
                  />
                </FontWrapper>
              </FontAwesomeIconWrapper>
            </PostsWrapper>
          ))
        : 'Постов нет'}
      <PopularBookForm />
    </>
  );
};

const FontWrapper = styled.div`
  & > svg {
    width: 18px;
    height: auto;
    cursor: pointer;
  }
`;

const PostsWrapper = styled.div`
  //   width: 352px;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const Infowrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImgInfoWrapper = styled.div`
  display: flex;
`;

const FontAwesomeIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const PostImg = styled.div`
  text-align: center;
  width: 200px;

  & img {
    width: 100%;
    height: auto;
  }
`;

const PriceWraper = styled.div`
  display: flex;
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
`;

const StarWrapper = styled.div`
  margin-left: 187px;
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

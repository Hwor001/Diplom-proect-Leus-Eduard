import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBasketShopping,
  faRightFromBracket,
  faUser as fasUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import BookstoreWord from '../../svg/Bookstore.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DropDown } from '#ui/drop-down post/drop-down-post';
import { SeachBooks } from '#features/auth/types';
import { auth, database } from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import {
  setIsFavorites,
  setIsBaskets,
} from '../../features/postactive/cartAndFavoritesSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store1';
import { useAppDispatch } from '#hooks';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const Header: React.FC<Props> = ({ handleSearch, post }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [page] = useState(1);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const { isFavorites, isBaskets } = useSelector(
    (state: RootState) => state.cartAndFavorites
  );
  const isFavorite = useSelector(
    (state: RootState) => state.favorite.favorites
  );
  const isBasket = useSelector((state: RootState) => state.basket.itemsInCart);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      } else {
        setUserName('');
      }
    });
    const favoritesRef = ref(database, `users/${userName}/favorites`);
    const basketRef = ref(database, `users/${userName}/basket`);

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
        console.error('Error fetching favorites from database:', error);
      });
  }, [userName, isFavorite, isBasket]);

  const signOutUser = async () => {
    try {
      setIsUserPopupOpen(isUserPopupOpen);
      const auth = getAuth();
      await signOut(auth);
      navigate('/PageSingInAndUp');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const Search = () => {
    if (userName !== '') {
      if (inputValue.trim() === '') {
        alert('Please enter a search term.');
      } else {
        handleSearch(inputValue);
      }
    } else {
      alert('Register or log in.');
    }
  };

  const User = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <ImgWrapper>
          <img
            src={BookstoreWord}
            alt="Bookstore"
            onClick={() =>
              userName !== ''
                ? navigate(`/MainBookStore`)
                : alert('Register or log in.')
            }
          />
        </ImgWrapper>
        <SeachWrapper>
          <input
            className="search-text"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Link
            to={
              userName !== '' && inputValue.trim() !== ''
                ? `/search/${inputValue}/${page}`
                : '#'
            }
          >
            <FontAwesomeIcon icon={faSearch} onClick={Search} />
          </Link>
        </SeachWrapper>
        {userName !== '' && inputValue.trim() !== '' && (
          <DropDown searchResultsText={inputValue} post={post} />
        )}
        <FontWrapper>
          <Link to={userName !== '' ? `/Favorite` : '#'}>
            <FontAwesomeIcon
              icon={isFavorite.length > 0 || isFavorites ? fasHeart : faHeart}
              onClick={() =>
                userName !== ''
                  ? navigate(`/Favorite`)
                  : alert('Register or log in.')
              }
            />
          </Link>
          <Link to={userName !== '' ? `/Basket` : '#'}>
            <FontAwesomeIcon
              icon={faBasketShopping}
              style={{
                color: isBasket.length > 0 || isBaskets ? 'green' : 'black',
              }}
              onClick={() =>
                userName !== ''
                  ? navigate(`/Basket`)
                  : alert('Register or log in.')
              }
            />
          </Link>
          <FontAwesomeIcon
            icon={userName === '' ? faUser : fasUser}
            onClick={() =>
              userName !== '' ? User() : alert('Register or log in.')
            }
          />
          {isUserPopupOpen && (
            <UserPopup>
              <Wrapper>
                <All>
                  <Button>
                    <NameWrapper>
                      <Name>{userName}</Name>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        onClick={signOutUser}
                      />
                    </NameWrapper>
                    <FontAwesomeIcon
                      icon={faX}
                      onClick={() => setIsUserPopupOpen(false)}
                    />
                  </Button>
                </All>
                <UserWrapper>
                  <TextLink to={`/Account`}>
                    <TextAccount>account change</TextAccount>
                  </TextLink>
                </UserWrapper>
              </Wrapper>
            </UserPopup>
          )}
        </FontWrapper>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-y: auto;
`;

const All = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e7e7e7;
  padding: 26px 0;
  width: 288px;
  flex-shrink: 0;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ImgWrapper = styled.div`
  margin-top: 38px;
  margin-left: 15px;
  cursor: pointer;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TextAccount = styled.p`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
`;

const Name = styled.div`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
`;

const UserPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 368px;
  background: #f3f3f3;
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow-y: auto;

  & button {
    transform: translate(35px, 0px);
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 50%;
  background-color: #f3f3f3;
  transform: translateX(-50%);
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
  z-index: 3;
`;

const SeachWrapper = styled.div`
  all: unset;
  width: 542px;
  padding: 23px 0;
  input {
    width: -webkit-fill-available;
    padding: 19.25px 0;
    border: 1px solid #e7e7e7;
    color: black;
    text-indent: 25px;
    &::placeholder {
      color: silver;
      text-indent: 25px;
    }
  }
  & svg {
    position: absolute;
    transform: translate(-30px, 20px);
  }
  & svg:hover {
    background-color: silver;
  }
`;

const FontWrapper = styled.div`
  display: flex;
  align-items: center;

  & svg {
    padding: 15px;
    cursor: pointer;
  }
  & svg:hover {
    background-color: silver;
  }
`;

const HeaderContainer = styled.div`
  padding-top: 103px;
  background-color: #f3f3f3;
`;

const TextLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;

export default Header;

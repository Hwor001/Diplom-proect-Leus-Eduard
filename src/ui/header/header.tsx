import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBasketShopping,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { Button6 } from '#ui/button/button6';
import BookstoreWord from '../../svg/Bookstore.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DropDown } from '#ui/post/drop-down-post';
import { SeachBooks } from '#features/auth/types';
import { auth } from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const Header: React.FC<Props> = ({ handleSearch, post }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const displayName = user.displayName || '';
        setUserName(displayName);
      } else {
        setUserName('');
      }
    });
  }, []);
  const signOutUser = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/PageSingInAndUp');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const Bookstore = () => {
    navigate('/MainBookStore');
  };
  const Search = () => {
    console.log('seach', inputValue);
    handleSearch(inputValue);
  };
  const Heart = () => {};
  const Shopping = () => {};
  const User = () => {
    setIsUserPopupOpen(!isUserPopupOpen);
  };

  return (
    <HeaderWrapper>
      <Button6 onClick={Bookstore}>
        <img src={BookstoreWord} alt="Bookstore" />
      </Button6>
      <SeachWrapper>
        <input
          className="search-text"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Link to={`/search/${inputValue}/${page}`}>
          <FontAwesomeIcon icon={faSearch} onClick={Search} />
        </Link>
      </SeachWrapper>
      {inputValue.trim() !== '' && (
        <DropDown searchResultsText={inputValue} post={post} />
      )}
      <FontWrapper>
        <Link to={`/Favorite`}>
          <FontAwesomeIcon icon={faHeart} onClick={Heart} />
        </Link>
        <Link to={`/Basket`}>
          <FontAwesomeIcon icon={faBasketShopping} onClick={Shopping} />
        </Link>
        <FontAwesomeIcon icon={faUser} onClick={User} />
        {isUserPopupOpen && (
          <UserPopup>
            <UserWrapper>
              <Link to={`/Account`}>
                <TextAccount>Changing your account</TextAccount>
              </Link>
              <NameWrapper>
                <Name>{userName}</Name>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  onClick={signOutUser}
                />
              </NameWrapper>
            </UserWrapper>
            <button onClick={() => setIsUserPopupOpen(false)}>Close</button>
          </UserPopup>
        )}
      </FontWrapper>
    </HeaderWrapper>
  );
};

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserWrapper = styled.div``;

const TextAccount = styled.p``;

const Name = styled.p``;

const UserPopup = styled.div`
  position: absolute;
  width: 368px;
  height: -webkit-fill-available;
  background: white;
  display: flex;

  & button {
    transform: translate(35px, 0px);
  }
`;

const HeaderWrapper = styled.div`
  width: 80%;
  display: flex;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
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
    transform: translate(-30px, 23px);
  }
`;

const FontWrapper = styled.div`
  display: flex;
  align-items: center;

  & svg {
    padding: 15px;
    cursor: pointer;
  }
`;

export default Header;

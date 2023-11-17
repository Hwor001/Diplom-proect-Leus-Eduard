import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';
import { Button6 } from '#ui/button/button6';
import BookstoreWord from '../../svg/Bookstore.svg';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DropDown } from '#ui/post/drop-down-post';
import { SeachBooks } from '#features/auth/types';

interface Props {
  handleSearch: (searchText: string) => void;
  post: SeachBooks;
}

export const Header: React.FC<Props> = ({ handleSearch, post }) => {
  // const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const Bookstore = () => {};
  const Search = () => {
    console.log('seach', inputValue);
    handleSearch(inputValue);
  };
  const Heart = () => {};
  const Shopping = () => {};
  const User = () => {};
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
        <Link to={`/Account`}>
          <FontAwesomeIcon icon={faUser} onClick={User} />
        </Link>
      </FontWrapper>
    </HeaderWrapper>
  );
};

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

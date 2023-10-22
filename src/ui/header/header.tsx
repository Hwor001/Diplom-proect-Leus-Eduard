import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUser,
  faHeart,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button4 } from '#ui/button/button4';
import { Button5 } from '#ui/button/button5';
import { Button6 } from '#ui/button/button6';
import BookstoreWord from '../../svg/Bookstore.svg';

export const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  //   const name = 'Leus Eduard';
  //   const savedName = name || '';
  const Bookstore = () => {};
  const Search = () => {
    console.log('seach');
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
        <Button5 onClick={Search}>
          <FontAwesomeIcon icon={faSearch} />
        </Button5>
      </SeachWrapper>
      <ButtonWrapper>
        <Button4 onClick={Heart}>
          <FontAwesomeIcon icon={faHeart} />
        </Button4>
        <Button4 onClick={Shopping}>
          <FontAwesomeIcon icon={faBagShopping} />
        </Button4>
        <Button4 onClick={User}>
          <FontAwesomeIcon icon={faUser} />
        </Button4>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;

import { Button2 } from '#ui/button/button2';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faSearch,
  faUser,
  faHeart,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button4 } from '#ui/button/button4';

const StyledFontAwesomeIcon = styled(Button4)`
  position: absolute;
  transform: translate3d(100px, 100px, 100px);
`;

export const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  //   const name = 'Leus Eduard';
  //   const savedName = name || '';
  const bookstor = () => {};
  const b = () => {
    console.log('seach');
  };
  const bo = () => {};
  const boo = () => {};
  const book = () => {};

  return (
    <HeaderWrapper>
      <Button4 onClick={bookstor}>Bookstore</Button4>
      <SeachWrapper>
        <input
          className="search-text"
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <StyledFontAwesomeIcon onClick={b}>
          <FontAwesomeIcon icon={faSearch} />
        </StyledFontAwesomeIcon>
      </SeachWrapper>
      <ButtonWrapper>
        <Button4 onClick={bo}>
          <FontAwesomeIcon icon={faHeart} />
        </Button4>
        <Button4 onClick={boo}>
          <FontAwesomeIcon icon={faBagShopping} />
        </Button4>
        <Button4 onClick={book}>
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
`;

const SeachWrapper = styled.div`
  all: unset;
  width: 542px;
  input {
    width: -webkit-fill-available;
    padding: 19.25px 0;
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
`;

export default Header;

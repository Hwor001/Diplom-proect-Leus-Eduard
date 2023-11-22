import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store1';
import {
  increaseQuantity,
  decreaseQuantity,
} from '../../features/postactive/quantity.slice';

export const Quantity: React.FC<{ isbn13: number }> = ({ isbn13 }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state: RootState) => state.basketQuantity[isbn13] || ''
  );

  return (
    <AllPlusMinusWrapper>
      <PlusMinusWrapper>
        <FontAwesomeIcon
          icon={faMinus}
          onClick={() => dispatch(decreaseQuantity(isbn13))}
        />
        <QuantityWrapper>{quantity}</QuantityWrapper>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => dispatch(increaseQuantity(isbn13))}
        />
      </PlusMinusWrapper>
    </AllPlusMinusWrapper>
  );
};

const AllPlusMinusWrapper = styled.div`
  width: 168px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlusMinusWrapper = styled.div`
  display: contents;

  & > svg {
    cursor: pointer;
  }
`;

const QuantityWrapper = styled.div`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: black;
`;

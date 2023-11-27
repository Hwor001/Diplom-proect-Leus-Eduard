import { styled } from 'styled-components';
import { BasketBook } from '#ui/post/post-basket';

export const BasketForm: React.FC = () => {
  return (
    <AllWrapper>
      <BasketWrapper>
        <BasketBook />
      </BasketWrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div`
  width: -webkit-fill-available;
`;

const BasketWrapper = styled.div`
  width: -webkit-fill-available;
  display: grid;
  gap: 15px;
`;

import { styled } from 'styled-components';
import { BasketBook } from '#ui/post/post-basket';
import { Response } from '#features/auth/types';

interface BookProps {
  response: Response;
}

export const BasketForm: React.FC<BookProps> = ({ response }) => {
  return (
    <AllWrapper>
      <BasketWrapper>
        <BasketBook response={response}></BasketBook>
      </BasketWrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const BasketWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

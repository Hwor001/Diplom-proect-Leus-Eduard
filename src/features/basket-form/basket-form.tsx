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

const AllWrapper = styled.div`
  width: -webkit-fill-available;
`;

const BasketWrapper = styled.div`
  width: -webkit-fill-available;
  display: grid;
  gap: 15px;
`;

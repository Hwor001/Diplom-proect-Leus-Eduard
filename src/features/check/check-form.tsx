import styled from 'styled-components';
import { CheckBook } from '#ui/post/check-post';
import { Response } from '#features/auth/types';

interface BookProps {
  response: Response;
}

export const CheckForm: React.FC<BookProps> = ({ response }) => {
  return (
    <AllWrapper>
      <CheckWrapper>
        <CheckBook response={response}></CheckBook>
      </CheckWrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const CheckWrapper = styled.div``;

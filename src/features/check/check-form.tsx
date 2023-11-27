import styled from 'styled-components';
import { CheckBook } from '#ui/post/check-post';

interface BookProps {
  response: Response;
}

export const CheckForm: React.FC = () => {
  return (
    <AllWrapper>
      <CheckWrapper>
        <CheckBook></CheckBook>
      </CheckWrapper>
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const CheckWrapper = styled.div``;

import { styled } from 'styled-components';
import { NewsLetter } from '#features/newsletter/newsletter-form';
import { Response } from '#features/auth/types';
import { RootState } from '../../store1';
import { useSelector, useDispatch } from 'react-redux';
import { FavoriteBook } from '#ui/post/post-favorite';

interface BookProps {
  response: Response;
}

export const FavoriteForm: React.FC<BookProps> = ({ response }) => {
  return (
    <AllWrapper>
      <FavoriteWrapper>
        <FavoriteBook response={response}></FavoriteBook>
      </FavoriteWrapper>
      <NewsLetter />
    </AllWrapper>
  );
};

const AllWrapper = styled.div`
  width: -webkit-fill-available;
`;

const FavoriteWrapper = styled.div`
  width: -webkit-fill-available;
  display: grid;
  gap: 15px;
`;

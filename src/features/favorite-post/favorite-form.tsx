import { styled } from 'styled-components';
import { FavoriteBook } from '#ui/post/post-favorite';

export const FavoriteForm: React.FC = () => {
  return (
    <AllWrapper>
      <FavoriteWrapper>
        <FavoriteBook></FavoriteBook>
      </FavoriteWrapper>
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

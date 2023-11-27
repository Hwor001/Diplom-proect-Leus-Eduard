import styled from 'styled-components';
import { Response } from '#features/auth/types';
import { SelectedPosts } from '#ui/post/selected-post';

interface BookProps {
  response: Response;
  title: string;
}

export const SelectedBookForm: React.FC<BookProps> = ({ response }) => {
  if (!response || !response.title) {
    return <div>Loading...</div>;
  }
  return (
    <SelectedBookWrapper>
      <MainBookStoreWrapper>
        <SelectedPosts response={response} title={response.title} />
      </MainBookStoreWrapper>
    </SelectedBookWrapper>
  );
};

const SelectedBookWrapper = styled.div``;

const MainBookStoreWrapper = styled.div``;

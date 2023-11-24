import { Posts } from '#ui/post/post';
import { styled } from 'styled-components';
import { Post, Response } from '#features/auth/types';
import { NewsLetter } from '#features/newsletter/newsletter-form';

type ListOfPostsProps = {
  posts: Post[];
  response: Response;
};

export const MainBookStoreForm: React.FC<ListOfPostsProps> = ({
  posts,
  response,
}) => {
  const getPostIsbn13AndElement = (isbn13: number) =>
    posts.find((item) => item.isbn13 === isbn13);
  const getHalfOfCards = (part: 'left'): number[] => {
    const identifiers = posts.map((element) => element.isbn13);
    switch (part) {
      case 'left':
        return identifiers.slice(0, 20);
      default:
        return [];
    }
  };

  return (
    <AllWrapper>
      <MainBookStoreWrapper>
        {getHalfOfCards('left').map((element, isbn13) => (
          <Posts
            key={isbn13}
            post={getPostIsbn13AndElement(element)!}
            response={response}
          />
        ))}
      </MainBookStoreWrapper>
      <NewsLetter />
    </AllWrapper>
  );
};

const AllWrapper = styled.div``;

const MainBookStoreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  & > :nth-last-child(-n + 2) {
    transform: translateX(183.5px);
  }
`;

import { Posts } from '#ui/post/post';
import { styled } from 'styled-components';
import { Post } from '#features/auth/types';

type ListOfPostsProps = {
  posts: Post[];
};

export const MainBookStoreForm: React.FC<ListOfPostsProps> = (
  props: ListOfPostsProps
) => {
  const getPostIdAndElement = (id: number) =>
    props.posts.find((item) => item.id === id);

  return (
    <MainBookStoreWrapper>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((element, id) => (
        <Posts key={id} post={getPostIdAndElement(element)!}></Posts>
      ))}
    </MainBookStoreWrapper>
  );
};

const MainBookStoreWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  // grid-template-columns: 200px 200px 200px;
  // grid-template-columns: 1fr 1fr 1fr;
`;

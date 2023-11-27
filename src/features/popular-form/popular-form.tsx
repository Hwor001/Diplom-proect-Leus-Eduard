import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { PostsSimilar } from '#ui/post/post-similar';
import { useAppDispatch, useAppSelector } from '#hooks';
import {
  popularBooksStart,
  setCurrentIndex,
} from '#features/postactive/popular.slice';

export const PopularBookForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books, error, currentIndex } = useAppSelector(
    (state) => state.popular
  ) || { currentIndex: 0 };

  useEffect(() => {
    dispatch(popularBooksStart({ page: 1 }));
    dispatch(setCurrentIndex(0));
  }, [dispatch]);

  const handleNextBook = () => {
    const bookLength = books?.books?.length || 0;
    const maxIndex = bookLength - 1;
    const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : currentIndex;

    if (nextIndex <= maxIndex - 3) {
      dispatch(setCurrentIndex(nextIndex));
    }
  };

  const handlePrevBook = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    dispatch(setCurrentIndex(prevIndex));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books || !books.books) {
    return null;
  }

  return (
    <AllSimilarBoookWrapper>
      <SimilarBoookWrapper>
        <TextWrapper>Popular Books</TextWrapper>
        <FontsWrapper>
          <StyledFontAwesomeIcon icon={faArrowLeft} onClick={handlePrevBook} />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={handleNextBook} />
        </FontsWrapper>
      </SimilarBoookWrapper>
      <PostsWrapper>
        <PostsSimilar response={books} currentIndex={currentIndex} />
      </PostsWrapper>
    </AllSimilarBoookWrapper>
  );
};

const PostsWrapper = styled.div`
  margin: auto;
`;

const AllSimilarBoookWrapper = styled.div`
  width: 1120px;
`;

const SimilarBoookWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FontsWrapper = styled.div``;

const TextWrapper = styled.h2`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: silver;
  }
`;

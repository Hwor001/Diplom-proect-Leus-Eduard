import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { PostsSimilar } from '#ui/post/post-similar';
import {
  similarBooksStart,
  setCurrentIndex,
} from '#features/postactive/similar.slice';
import { useAppDispatch, useAppSelector } from '#hooks';

interface SimilarBoookFormProps {
  title: string;
}

export const SimilarBoookForm: React.FC<SimilarBoookFormProps> = ({
  title,
}) => {
  const dispatch = useAppDispatch();
  const { books, currentIndex, error } = useAppSelector(
    (state) => state.similar
  );

  useEffect(() => {
    if (title) {
      dispatch(similarBooksStart({ searchQuery: title }));
      dispatch(setCurrentIndex(0));
    }
  }, [title, dispatch]);

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
        <TextWrapper>Similar Books</TextWrapper>
        <FontsWrapper>
          <StyledFontAwesomeIcon icon={faArrowLeft} onClick={handlePrevBook} />
          <StyledFontAwesomeIcon icon={faArrowRight} onClick={handleNextBook} />
        </FontsWrapper>
      </SimilarBoookWrapper>
      <PostsSimilar response={books} currentIndex={currentIndex} />
    </AllSimilarBoookWrapper>
  );
};

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

import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { PostsSimilar } from '#ui/post/post-similar';
import {
  setSimilarBooks,
  setCurrentIndex,
} from '#features/postactive/similar.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store1';

export const PopularBookForm: React.FC = () => {
  const dispatch = useDispatch();
  const { similarBooks, currentIndex } = useSelector(
    (state: RootState) => state.auth
  ) || { similarBooks: null, currentIndex: 0 };

  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/search/popular`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setSimilarBooks(data));
        dispatch(setCurrentIndex(0));
      });
  }, [dispatch]);

  const handleNextBook = () => {
    const bookLength = similarBooks?.books?.length || 0;
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

  if (!similarBooks) {
    return <div>Loading...</div>;
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
        <PostsSimilar response={similarBooks} currentIndex={currentIndex} />
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
`;

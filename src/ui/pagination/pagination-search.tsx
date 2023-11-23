import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type Props = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const PaginationSearch: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<string>('');
  const handleIncrement = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };
  const handleDecrement = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handlePageChange = () => {
    if (currentPage < pageCount) {
      onPageChange(pageCount);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page) && page >= 1 && page <= pageCount) {
      onPageChange(page);
    }
  };

  return (
    <PagePagination>
      <Left>
        <StyledArrow icon={faArrowLeft} onClick={handleDecrement} />
        <Text>Prev</Text>
      </Left>
      <JumperDiv>
        {currentPage !== 1 ? (
          <JumpButton onClick={() => onPageChange(1)}>1</JumpButton>
        ) : null}
        {currentPage > 2 ? <JumpButton>...</JumpButton> : null}
        <JumpButton>{currentPage}</JumpButton>
        {pageCount - currentPage > 1 ? <JumpButton>...</JumpButton> : null}
        {currentPage !== pageCount ? (
          <JumpButton onClick={handlePageChange}>{pageCount}</JumpButton>
        ) : null}
        {pageCount > 10 && (
          <JumperDiv>
            <StyledInput
              type="number"
              value={inputPage}
              onChange={handleInputChange}
              min="1"
              max={pageCount.toString()}
            />
            <StyledButton onClick={handleGoToPage}>Go</StyledButton>
          </JumperDiv>
        )}
      </JumperDiv>
      <Right>
        <Text>Next</Text>
        <StyledArrow icon={faArrowRight} onClick={handleIncrement} />
      </Right>
    </PagePagination>
  );
};

const Text = styled.p`
  font-family: 'Helios';
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const PagePagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JumperDiv = styled.div`
  display: flex;
  color: var(--text-primary-color);
  height: 25px;

  & JumperDiv {
    transform: translateY(15px);
  }
`;

const JumpButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  font-family: 'Helios';
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  &:hover {
    color: var(--system-primary-color);
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledArrow = styled(FontAwesomeIcon)`
  fill: white;
  transform: translateY(-7px);
  stroke: var(--text-primary-color);
  width: 20px;
  height: 20px;
  object-fit: cover;
  position: relative;
  top: 5px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  transform: translateY(13px);
`;

const StyledButton = styled.button`
  transform: translateY(13px);
`;

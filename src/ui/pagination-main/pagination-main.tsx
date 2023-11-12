import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from '../../../images/arrow-sm-left-svgrepo-com.svg';
import { ReactComponent as ArrowRight } from '../../../images/arrow-sm-right-svgrepo-com.svg';

type Props = {
  pageCount: number;
  currentPage: number;
  onPageChange: (arg: number) => void;
};

export const PaginationMain: React.FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <PagePagination>
      {currentPage !== 1 ? (
        <Left>
          <PaginationButton
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
          >
            <StyledArrowImageLeft /> Back
          </PaginationButton>
        </Left>
      ) : null}
      <JumperDiv>
        {currentPage !== 1 ? (
          <JumpButton type="button" onClick={() => onPageChange(1)}>
            1
          </JumpButton>
        ) : null}
        {currentPage > 2 ? <JumpButton type="button">...</JumpButton> : null}
        <JumpButton type="button" onClick={() => onPageChange(currentPage)}>
          {currentPage}
        </JumpButton>
        {pageCount - currentPage > 1 ? (
          <JumpButton type="button">...</JumpButton>
        ) : null}
        {currentPage !== pageCount ? (
          <JumpButton type="button" onClick={() => onPageChange(pageCount)}>
            {pageCount}
          </JumpButton>
        ) : null}
      </JumperDiv>
      <Right>
        {pageCount !== currentPage ? (
          <PaginationButton
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
            <StyledArrowImageRight />
          </PaginationButton>
        ) : null}
      </Right>
    </PagePagination>
  );
};

const PagePagination = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JumperDiv = styled.div`
  color: var(--text-primary-color);
`;

const JumpButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  font-size: 16px;
  font-weight: 600;
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

const PaginationButton = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--text-secondary-color);

  &:hover {
    color: var(--system-primary-color);
  }
`;

const StyledArrowImageLeft = styled(ArrowLeft)`
  fill: white;
  stroke: var(--text-primary-color);
  width: 20px;
  height: 20px;
  object-fit: cover;
  position: relative;
  top: 5px;
  cursor: pointer;
`;

const StyledArrowImageRight = styled(ArrowRight)`
  fill: white;
  stroke: var(--text-primary-color);
  width: 20px;
  height: 20px;
  object-fit: cover;
  position: relative;
  top: 5px;
  cursor: pointer;
`;

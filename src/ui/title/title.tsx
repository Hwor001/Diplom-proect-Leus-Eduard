import styled from 'styled-components';

type Props = {
  children: string[] | string;
};

export const Title: React.FC<Props> = ({ children }) => {
  return <TitleWrapper>{children}</TitleWrapper>;
};

const TitleWrapper = styled.h1`
  height: auto;
  color: var(--text-primary-color);
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

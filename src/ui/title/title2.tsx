import styled from 'styled-components';

type Props = {
  children: string[] | string;
};

export const Title2: React.FC<Props> = ({ children }) => {
  return <TitleWrapper>{children}</TitleWrapper>;
};

const TitleWrapper = styled.h1`
  height: auto;
  color: var(--text-primary-color);
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 56px;
  line-height: 64px;
`;

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
`;

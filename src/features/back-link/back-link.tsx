import { styled } from 'styled-components';

export const Backlink: React.FC = () => {
  return <BacklinkWrapper>Back to home</BacklinkWrapper>;
};

const BacklinkWrapper = styled.div`
  color: var(--text-primary-color);
`;

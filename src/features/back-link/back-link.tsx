import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackLinkWrapper>
      <BackLinkText onClick={goBack}>Back to home</BackLinkText>
    </BackLinkWrapper>
  );
};

const BackLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BackLinkText = styled.div`
  color: var(--text-primary-color);
  margin: 40px 20px 0 20px;
  cursor: pointer;
`;

export default BackLink;

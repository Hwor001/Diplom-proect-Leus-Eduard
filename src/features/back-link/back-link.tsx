import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const BackLink: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <BackLinkWrapper>
      <FontAwesomeIcon icon={faArrowLeft} onClick={goBack} />
    </BackLinkWrapper>
  );
};

const BackLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  & svg {
    color: var(--text-primary-color);
    height: 40px;
    margin-top: 22px;
    cursor: pointer;
  }
`;

export default BackLink;

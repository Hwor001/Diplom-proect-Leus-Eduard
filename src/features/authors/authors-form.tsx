import styled from 'styled-components';
import { Response } from '#features/auth/types';

interface BookProps {
  response: Response;
}

export const AuthorsForm: React.FC<BookProps> = ({ response }) => {
  return <RegistrationWrapper>{response.authors}</RegistrationWrapper>;
};

const RegistrationWrapper = styled.div`
  font-family: 'Helios';
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  padding: 48px 0;
`;

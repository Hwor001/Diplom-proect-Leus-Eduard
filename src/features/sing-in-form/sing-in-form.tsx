import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setName, setPassword } from '../sing-up-form/sing-up-form.slice';

export const SingInForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const handleRegistration = () => {
    navigate('/success');
  };

  return (
    <RegistrationWrapper>
      <Input
        type="text"
        labelText="Name"
        inputText="Your name"
        value={name}
        onChange={({ currentTarget }) => dispatch(setName(currentTarget.value))}
      />
      <Input
        type="password"
        labelText="Password"
        inputText="Your password"
        value={password}
        onChange={({ currentTarget }) =>
          dispatch(setPassword(currentTarget.value))
        }
      />
      <Button variant="primary" onClick={handleRegistration}>
        Sing in
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border: 1px solid var(--text-primary-color);
  padding: 40px;
`;

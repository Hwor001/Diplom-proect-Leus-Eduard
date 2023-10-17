import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import {
  setPassword,
  setConfirmedPassword,
} from '../sing-up-form/sing-up-form.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth/registration.slice';
import { Title } from '#ui/title/title';

export const NewPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmedPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );
  const isCompleted = useAppSelector(
    ({ registration }) => registration.isCompleted
  );
  useEffect(() => {
    if (isCompleted) {
      navigate('/registration');
    }
  }, [isCompleted, navigate]);

  return (
    <RegistrationWrapper>
      <Title>new password</Title>
      <Input
        type="password"
        labelText="Password"
        inputText="Your password"
        value={password}
        onChange={({ currentTarget }) =>
          dispatch(setPassword(currentTarget.value))
        }
        ref={passwordInputRef}
      />
      <Input
        type="password"
        labelText="Confirm password"
        inputText="Confirm your password"
        value={confirmedPassword}
        onChange={({ currentTarget }) =>
          dispatch(setConfirmedPassword(currentTarget.value))
        }
        ref={confirmedPasswordInputRef}
      />
      <Button
        variant="primary"
        onClick={() => dispatch(register({ username: name, password }))}
      >
        set password
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

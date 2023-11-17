import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { setEmail } from '../sing-up-form/sing-up-form.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { register } from '../auth/registration.slice';
import { Title } from '#ui/title/title';

export const ResetPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);

  // const isCompleted = useAppSelector(
  //   ({ registration }) => registration.isCompleted
  // );
  // useEffect(() => {
  //   if (isCompleted) {
  //     navigate('/registration');
  //   }
  // }, [isCompleted, navigate]);
  const bur = () => {};

  return (
    <RegistrationWrapper>
      <Title>reset password</Title>
      <Input
        type="email"
        labelText="Email"
        inputText="Your email"
        value={email}
        onChange={({ currentTarget }) =>
          dispatch(setEmail(currentTarget.value))
        }
        ref={emailInputRef}
      />
      <Button
        variant="primary"
        onClick={bur}
        // onClick={() => dispatch(register({ username: name, password, email }))}
      >
        go to home
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

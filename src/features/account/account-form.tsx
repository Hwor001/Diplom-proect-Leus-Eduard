import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import {
  setName,
  setEmail,
  setPassword,
  setConfirmedPassword,
} from '../sing-up-form/sing-up-form.slice';
import { Title } from '#ui/title/title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { register } from '../auth/registration.slice';
import { Button3 } from '#ui/button/button3';

export const AccountForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmedPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );
  // const isCompleted = useAppSelector(
  //   ({ registration }) => registration.isCompleted
  // );
  const cancel = {};
  // useEffect(() => {
  //   if (isCompleted) {
  //     navigate('/registration');
  //   }
  // }, [isCompleted, navigate]);
  const bur = () => {};

  return (
    <RegistrationWrapper>
      <Title>profile</Title>
      <NameEmailWrapper>
        <Input
          type="text"
          labelText="Name"
          inputText="Your name"
          value={name}
          onChange={({ currentTarget }) =>
            dispatch(setName(currentTarget.value))
          }
          ref={nameInputRef}
        />
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
      </NameEmailWrapper>
      <Title>password</Title>
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
      <PasswordWrapper>
        <Input
          type="password"
          labelText="New password"
          inputText="Your password"
          value={password}
          onChange={({ currentTarget }) =>
            dispatch(setPassword(currentTarget.value))
          }
          ref={passwordInputRef}
        />
        <Input
          type="password"
          labelText="Confirm new password"
          inputText="Confirm your password"
          value={confirmedPassword}
          onChange={({ currentTarget }) =>
            dispatch(setConfirmedPassword(currentTarget.value))
          }
          ref={confirmedPasswordInputRef}
        />
      </PasswordWrapper>
      <ButtonWrapper>
        <Button
          variant="primary"
          onClick={bur}
          // onClick={() =>
          //   dispatch(register({ username: name, password, email }))
          // }
        >
          Save changes
        </Button>
        <Button3 variant="primary" onClick={() => cancel}>
          cancel
        </Button3>
      </ButtonWrapper>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

const NameEmailWrapper = styled.div`
  display: flex;
`;
const PasswordWrapper = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  width: 544px;
  display: flex;
  margin-left: auto;
`;

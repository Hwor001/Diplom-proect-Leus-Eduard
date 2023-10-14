import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { useState } from 'react';
import {
  setName,
  setEmail,
  setPassword,
  setConfirmedPassword,
} from './sing-up-form.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../auth/registration.slice';
import { TabPanel } from '#ui/tabs/tads-panel';

export const SingUpForm: React.FC = () => {
  const tabItems = [
    { id: '1', title: 'SING IN' },
    { id: '2', title: 'SING UP' },
  ];
  const [activeTabId, setActiveTabId] = useState(tabItems[0].id);
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
      <TabPanel
        items={tabItems}
        activeId={activeTabId}
        onTabClick={setActiveTabId}
      />
      <Input
        type="text"
        labelText="Name"
        inputText="Your name"
        value={name}
        onChange={({ currentTarget }) => dispatch(setName(currentTarget.value))}
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
        Sign Up
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border: 1px solid var(--text-primary-color);
  padding: 40px;
`;

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
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const SingUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState<
    string | null
  >(null);

  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );

  const handleRegister = async () => {
    if (!name.trim()) {
      setNameError('Please enter your name.');
      return;
    } else {
      setNameError(null);
    }

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      return;
    } else {
      setEmailError(null);
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password.');
      return;
    } else {
      setPasswordError(null);
    }

    if (!confirmedPassword.trim()) {
      setConfirmedPasswordError('Please confirm your password.');
      return;
    } else {
      setConfirmedPasswordError(null);
    }

    if (password !== confirmedPassword) {
      setConfirmedPasswordError('Passwords do not match.');
      return;
    } else {
      setConfirmedPasswordError(null);
    }

    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      console.log(user);
      navigate('/MainBookStore');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <RegistrationWrapper>
      <Input
        type="text"
        labelText="Name"
        inputText="Your name"
        value={name}
        onChange={({ currentTarget }) => {
          dispatch(setName(currentTarget.value));
          setNameError(null);
        }}
      />
      {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

      <Input
        type="email"
        labelText="Email"
        inputText="Your email"
        value={email}
        onChange={({ currentTarget }) => {
          dispatch(setEmail(currentTarget.value));
          setEmailError(null);
        }}
      />
      {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

      <Input
        type="password"
        labelText="Password"
        inputText="Your password"
        value={password}
        onChange={({ currentTarget }) => {
          dispatch(setPassword(currentTarget.value));
          setPasswordError(null);
        }}
      />
      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

      <StyledInput
        type="password"
        labelText="Confirm password"
        inputText="Confirm your password"
        value={confirmedPassword}
        onChange={({ currentTarget }) => {
          dispatch(setConfirmedPassword(currentTarget.value));
          setConfirmedPasswordError(null);
        }}
      />
      {confirmedPasswordError && (
        <ErrorMessage>{confirmedPasswordError}</ErrorMessage>
      )}

      <Button variant="primary" onClick={handleRegister}>
        Sign Up
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 14px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 40px;
`;

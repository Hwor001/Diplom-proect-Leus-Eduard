import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import {
  setName,
  setEmail,
  setPassword,
  setConfirmedPassword,
} from './sing-up-form.slice';
import { setUser } from '../auth/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const SingUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );
  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigate('/MainBookStore');
      })
      .catch(console.error);
  };
  const bur = () => {};

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
        type="email"
        labelText="Email"
        inputText="Your email"
        value={email}
        onChange={({ currentTarget }) =>
          dispatch(setEmail(currentTarget.value))
        }
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
      <Input
        type="password"
        labelText="Confirm password"
        inputText="Confirm your password"
        value={confirmedPassword}
        onChange={({ currentTarget }) =>
          dispatch(setConfirmedPassword(currentTarget.value))
        }
      />
      <Button
        variant="primary"
        onClick={() => handleRegister(email, password)}
        // onClick={() => dispatch(register({ username: name, password, email }))}
      >
        Sign Up
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

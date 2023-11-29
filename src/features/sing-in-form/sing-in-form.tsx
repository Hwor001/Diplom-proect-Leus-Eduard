import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEmail, setPassword } from '../sing-up-form/sing-up-form.slice';
import { ForgotPasswordButton } from '#ui/button/forgotPasswordButton';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const SingInForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate('/MainBookStore');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  const ForgotPassword = () => {
    navigate('/ResetPassword');
  };

  return (
    <RegistrationWrapper>
      <Input
        type="email"
        labelText="Email"
        inputText="Your email"
        value={email}
        onChange={({ currentTarget }) =>
          dispatch(setEmail(currentTarget.value))
        }
      />
      <StyledInput
        type="password"
        labelText="Password"
        inputText="Your password"
        value={password}
        onChange={({ currentTarget }) =>
          dispatch(setPassword(currentTarget.value))
        }
      />
      <ForgotPasswordButton onClick={ForgotPassword}>
        Forgot password ?
      </ForgotPasswordButton>
      <Button variant="primary" onClick={() => handleLogin(email, password)}>
        Sing in
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 8px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 8px;
`;

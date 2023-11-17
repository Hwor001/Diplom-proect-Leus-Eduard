import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setEmail, setPassword } from '../sing-up-form/sing-up-form.slice';
import { Button2 } from '#ui/button/button2';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../auth/user.slice';

export const SingInForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const handleRegistration = () => {
    // navigate('/success');
  };
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
      .catch(() => alert('Invalid user!'));
  };

  const ForgotPassword = () => {};

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
      <Input
        type="password"
        labelText="Password"
        inputText="Your password"
        value={password}
        onChange={({ currentTarget }) =>
          dispatch(setPassword(currentTarget.value))
        }
      />
      <Button2 onClick={ForgotPassword}>Forgot password ?</Button2>
      <Button variant="primary" onClick={() => handleLogin(email, password)}>
        Sing in
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

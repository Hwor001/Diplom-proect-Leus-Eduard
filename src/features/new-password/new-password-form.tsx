import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import {
  setPassword,
  setConfirmedPassword,
} from '../sing-up-form/sing-up-form.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Title } from '#ui/title/title';
import { getAuth, updatePassword } from 'firebase/auth';

export const NewPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const password = useAppSelector(({ signUpForm }) => signUpForm.password);
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );

  const newPassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      if (password === confirmedPassword) {
        updatePassword(user, password)
          .then(() => {
            console.log('Password updated successfully.');
            navigate('/MainBookStore');
          })
          .catch((error) => {
            console.error('Error updating password:', error);
          });
      } else {
        console.error('Passwords do not match');
      }
    } else {
      console.error('No authenticated user. Please sign in.');
    }
  };

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
      <Button variant="primary" onClick={newPassword}>
        set password
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;
`;

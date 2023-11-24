import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import {
  setName,
  setEmail,
  setPassword,
  setConfirmedPassword,
  setNewPassword,
} from '../sing-up-form/sing-up-form.slice';
import { Title } from '#ui/title/title';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Button3 } from '#ui/button/button3';
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from 'firebase/auth';

export const AccountForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const name = useAppSelector(({ signUpForm }) => signUpForm.name);
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const oldPassword = useAppSelector(({ signUpForm }) => signUpForm.password);
  const newPasswordValue = useAppSelector(
    ({ signUpForm }) => signUpForm.newPassword
  );
  const confirmedPassword = useAppSelector(
    ({ signUpForm }) => signUpForm.confirmedPassword
  );

  const cancel = () => {
    dispatch(setName(''));
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    dispatch(setNewPassword(''));
    dispatch(setConfirmedPassword(''));
    navigate(-1);
  };

  const newPasswordUpdate = () => {
    if (!oldPassword || !newPasswordValue || !confirmedPassword || !name) {
      alert('Please fill in all fields.');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('No authenticated user.');
      return;
    }

    if (newPasswordValue !== confirmedPassword) {
      console.error('New password and confirm password do not match.');
      return;
    }

    const newPassword = newPasswordValue;

    signInWithEmailAndPassword(auth, email, oldPassword)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log('Password updated successfully.');
            navigate('/MainBookStore');
          })
          .catch((error) => {
            console.error('Error updating password:', error);
            alert('wrong password');
          });
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        alert('incorrect email address, password ');
      });
  };

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
      </NameEmailWrapper>
      <Title>password</Title>
      <Input
        type="password"
        labelText="Old password"
        inputText="Your password"
        value={oldPassword}
        onChange={({ currentTarget }) =>
          dispatch(setPassword(currentTarget.value))
        }
      />
      <PasswordWrapper>
        <Input
          type="password"
          labelText="New password"
          inputText="Your password"
          value={newPasswordValue}
          onChange={({ currentTarget }) =>
            dispatch(setNewPassword(currentTarget.value))
          }
        />
        <Input
          type="password"
          labelText="Confirm new password"
          inputText="Confirm your password"
          value={confirmedPassword}
          onChange={({ currentTarget }) =>
            dispatch(setConfirmedPassword(currentTarget.value))
          }
        />
      </PasswordWrapper>
      <ButtonWrapper>
        <Button variant="primary" onClick={newPasswordUpdate}>
          Save changes
        </Button>
        <Button3 variant="primary" onClick={cancel}>
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

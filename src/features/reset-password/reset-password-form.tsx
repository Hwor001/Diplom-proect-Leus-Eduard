import { Button } from '../../ui/button/button';
import { Input } from '#ui/input/input';
import styled from 'styled-components';
import { setEmail } from '../sing-up-form/sing-up-form.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { Title } from '#ui/title/title';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const ResetPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const [resetSent, setResetSent] = useState(false);

  const reset = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSent(true);
      })
      .catch((error) => {
        alert('incorrect email address');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <RegistrationWrapper>
      <Title>reset password</Title>
      {resetSent && (
        <SuccessMessage>
          You will receive an email {email} with a link to reset your password!
        </SuccessMessage>
      )}
      <StyledInput
        type="email"
        labelText="Email"
        inputText="Your email"
        value={email}
        onChange={({ currentTarget }) =>
          dispatch(setEmail(currentTarget.value))
        }
      />
      <Button variant="primary" onClick={reset}>
        reset
      </Button>
    </RegistrationWrapper>
  );
};

const RegistrationWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
  padding: 31px;

  & button {
    width: -webkit-fill-available;
  }
`;

const SuccessMessage = styled.p`
  width: 480px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 40px;
`;

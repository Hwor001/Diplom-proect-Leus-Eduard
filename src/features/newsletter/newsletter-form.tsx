import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Input } from '#ui/input/input';
import { setEmail } from '../sing-up-form/sing-up-form.slice';
import { Button } from '#ui/button/button';

export const NewsLetter: React.FC = () => {
  const email = useAppSelector(({ signUpForm }) => signUpForm.email);
  const dispatch = useAppDispatch();
  const subscribe = {};
  return (
    <SubscribeToNewsletterWrapper>
      <SubscribeWrapper>Subscribe to Newsletter</SubscribeWrapper>
      <TextWrapper>
        Be the first to know about new IT books, upcoming releases, exclusive
        offers and more.
      </TextWrapper>
      <InputButttonWrapper>
        <InputWrapper
          type="email"
          inputText="Your email"
          value={email}
          onChange={({ currentTarget }) =>
            dispatch(setEmail(currentTarget.value))
          }
        />
        <ButtonWrapper>
          <Button variant="primary" onClick={() => subscribe}>
            Subscribe
          </Button>
        </ButtonWrapper>
      </InputButttonWrapper>
    </SubscribeToNewsletterWrapper>
  );
};

const InputWrapper = styled(Input)`
  width: 992px;
`;

const ButtonWrapper = styled.div`
  width: 147px;
`;

const SubscribeToNewsletterWrapper = styled.div`
  display: grid;
  justify-content: center;
`;

const InputButttonWrapper = styled.div`
  display: flex;
`;

const SubscribeWrapper = styled.h2`
  font-family: 'Bebas Neue';
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
`;

const TextWrapper = styled.p``;

import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const ForgotPasswordButton: React.FC<Props> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <ButtonWrapper type="button" disabled={disabled} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  all: unset;
  display: flex;
  cursor: pointer;
  margin-bottom: 40px;
  justify-content: center;
  &:hover {
    color: blue;
  }
`;

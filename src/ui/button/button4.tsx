import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button4: React.FC<Props> = ({ children, disabled, onClick }) => {
  return (
    <ButtonWrapper type="button" disabled={disabled} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  all: unset;
  cursor: pointer;
  width: 52px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

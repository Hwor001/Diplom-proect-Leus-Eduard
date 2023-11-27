import styled from 'styled-components';

type Props = {
  variant: 'primary' | 'secondary';
  children: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button3: React.FC<Props> = ({
  variant,
  children,
  disabled,
  onClick,
}) => {
  return (
    <ButtonWrapper
      type="button"
      $variant={variant}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {children}
    </ButtonWrapper>
  );
};

const css = String.raw;

const ButtonWrapper = styled.button<{
  $variant: 'primary' | 'secondary';
  $fitContent?: boolean;
}>`
  all: unset;
  font-family: 'Bebas Neue';
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  padding: 5px 10px;
  width: ${({ $fitContent }) =>
    $fitContent ? 'fit-content' : 'calc(100% - 20px)'};

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary': {
        return css`
          border: 1px solid white;
          background: white;
          color: #313037;
        `;
      }
      default:
        return '';
    }
  }}

  &:hover {
    background-color: #dbcdcd;
  }

  &:disabled {
    cursor: none;
    opacity: 0.67;
    color: gray;
  }
`;

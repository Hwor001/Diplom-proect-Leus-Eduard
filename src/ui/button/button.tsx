import styled from 'styled-components';

type Props = {
  variant: 'primary' | 'secondary';
  children: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
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
  display: block;
  font-family: 'Bebas Neue';
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  height: 56px;
  cursor: pointer;
  width: ${({ $fitContent }) =>
    $fitContent ? 'fit-content' : 'calc(100% - 20px)'};

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary': {
        return css`
          border: 1px solid white;
          background: #313037;
          color: white;
        `;
      }
      default:
        return '';
    }
  }}

  &:disabled {
    cursor: none;
    opacity: 0.67;
    color: gray;
  }
`;

import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  labelText: string;
  inputText: string;
  error?: string;
};

export const Input = forwardRef(
  (
    { labelText, inputText, error, ...restProps }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <Label>
        <LabelText>{labelText}</LabelText>
        <InputWrapper
          placeholder={inputText}
          {...restProps}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
        <Error>{error}</Error>
      </Label>
    );
  }
);

const Label = styled.label`
  display: block;
  width: fit-content;
  color: var(--text-primary-color);
`;

const LabelText = styled.div`
  font-family: 'Archivo';
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  text-align: start;
  position: relative;
  margin-bottom: 8px;
  left: 1px;
`;

const InputWrapper = styled.input`
  all: unset;
  width: 480px;
  height: 56px;
  text-indent: 20px;
  box-sizing: border-box;
  border: 1px solid #e7e7e7;
  &::placeholder {
    font-family: 'Archivo';
    font-weight: 400;
    text-indent: 20px;
    font-size: 16px;
    line-height: 32px;
    text-align: start;
  }
`;

const Error = styled.div`
  height: 20px;
  color: red;
`;

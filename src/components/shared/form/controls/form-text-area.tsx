import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

import { greyLighter, red, redLight, greyDark } from '@styles/constants';
import { FormInputWrapper } from './form-input-wrapper';

const FormTextAreaHint = styled.small`
  position: relative;
  color: ${greyDark};
  left: 90%;
`;

const TextAreaWrapper = styled(FormInputWrapper)`
  padding: 0.3125em 0.3125em 0 0.3125em;
`;

const TextArea = styled.textarea<FormTextAreaProps>`
  width: 100%;
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px ${greyLighter};
  background: ${(props) => props.hasError && redLight};
  border: 1px solid ${(props) => (props.hasError ? red : greyLighter)};
  outline: none;

  :focus {
    border-color: ${(props) =>
      props.hasError ? red : props.theme.colors.base};
  }
`;

interface FormTextAreaProps {
  onChange: Function;
  onBlur?: Function;
  value: string;
  placeholder?: string;
  displayCharCount?: boolean;
  maxCharCount?: number;
  name: string;
  hasError?: boolean;
  rows?: number;
  id?: string;
  label?: string;
  hint?: string;
}

export const FormTextArea: FC<FormTextAreaProps> = ({
  onChange,
  onBlur,
  value,
  placeholder,
  displayCharCount,
  maxCharCount,
  name,
  rows,
  id,
  label,
  hint,
  hasError,
}) => {
  const checkLength = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxCharCount && e.target.value.length > maxCharCount)
      e.target.value = e.target.value.slice(0, maxCharCount);
  };

  return (
    <TextAreaWrapper label={label} name={name} hint={hint}>
      <TextArea
        onChange={(e) => {
          checkLength(e);
          onChange(e);
        }}
        value={value}
        placeholder={placeholder}
        name={name}
        onBlur={(e) => onBlur && onBlur(e)}
        rows={rows}
        id={id || name}
        hasError={hasError}
      />

      {displayCharCount && (
        <FormTextAreaHint>
          {value.length}/{maxCharCount}
        </FormTextAreaHint>
      )}
    </TextAreaWrapper>
  );
};

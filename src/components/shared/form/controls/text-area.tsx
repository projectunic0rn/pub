import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';

import { greyLighter, red, redLight, white } from '@styles/constants';

const FormTextAreaHint = styled.small`
  color: ${greyLighter};
  position: absolute;
  right: 0;
  bottom: -20px;
`;

const TextAreaWrapper = styled.div`
  padding: 0.3125em 0.3125em 0 0.3125em;
`;

const TextArea = styled.textarea<FormTextAreaProps>`
  width: 100%;
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px ${greyLighter};
  border: ${(props) =>
    props.hasError ? `1px solid ${red}` : `1px solid ${greyLighter};`};
  background: ${(props) => (props.hasError ? redLight : white)};

  :focus {
    border-color: ${(props) =>
      props.hasError ? red : props.theme.colors.base};
  }
`;

type FormTextAreaProps = {
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
};

export const FormTextArea: FC<FormTextAreaProps> = ({
  onChange,
  onBlur,
  value,
  placeholder,
  displayCharCount,
  maxCharCount,
  name,
  hasError,
  rows,
  id,
}) => {
  const checkLength = (e: FormEvent<HTMLTextAreaElement>) => {
    return maxCharCount && e.currentTarget.value.length < maxCharCount
      ? e.currentTarget.value
      : e.currentTarget.value.slice(0, maxCharCount);
  };

  return (
    <TextAreaWrapper>
      <TextArea
        onChange={(e) => onChange(e, checkLength(e))}
        value={value}
        placeholder={placeholder}
        name={name}
        onBlur={(e) => onBlur && onBlur(e)}
        hasError={hasError}
        rows={rows}
        id={id}
      />
      {displayCharCount && (
        <FormTextAreaHint>
          {value.length}/{maxCharCount}
        </FormTextAreaHint>
      )}
    </TextAreaWrapper>
  );
};

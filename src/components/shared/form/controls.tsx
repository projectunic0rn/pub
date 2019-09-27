import React, { useState } from 'react';
import styled from '@styled-components';

interface FormInputProps {
  hasError?: boolean;
}

const FormLabel = styled.label`
  font-weight: 800;
  padding: 0.825em 0;
`;
const FormInput = styled.input<FormInputProps>`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: ${(props) =>
    props.hasError ? '1px solid red' : '1px solid lightgray;'};
  background: ${(props) => (props.hasError ? '#fff1f4' : 'white;')};
`;
const SelectInput = styled.select<FormSelectInputProps>`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: 1px solid lightgray;
  appearance: none;
  ​ :focus {
    border-color: black;
  }
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat 95% 50% white;
  border: ${(props) =>
    props.hasError ? '1px solid red' : '1px solid lightgray;'};
  background: ${(props) => (props.hasError ? '#fff1f4' : 'white;')};
`;
const FormHint = styled.small`
  color: gray;
`;
const FormTextAreaHint = styled.small`
  color: black;
  position: absolute;
  right: 0;
  bottom: -20px;
`;
const TextAreaWrapper = styled.div`
  position: relative;
`;
const TextArea = styled.textarea<FormTextAreaProps>`
  width: 100%;
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: ${(props) =>
    props.hasError ? '1px solid red' : '1px solid lightgray;'};
  background: ${(props) => (props.hasError ? '#fff1f4' : 'white;')};
`;
const LinkWrapper = styled.div`
  margin: 0.625em 0.125em;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
`;
const ButtonWrapper = styled.div`
  padding: 1.825em 0.125em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    text-align: center;
  }
`;

interface FormSelectInputProps {
  options: { id: string; type: string }[];
  name?: string;
  onChange: Function;
  onBlur: Function;
  hasError?: boolean;
  placeholder: string;
}

const FormSelectInput: React.FC<FormSelectInputProps> = ({
  options,
  name,
  onChange,
  onBlur,
  hasError,
  placeholder,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.type} value={option.type}>
      {option.type}
    </option>
  ));

  return (
    <SelectInput
      onBlur={(e) => {
        onBlur(e);
      }}
      options={options}
      name={name}
      onChange={(e: any) => onChange(e)}
      hasError={hasError}
      placeholder={placeholder}
    >
      <option key="0" value="">
        {placeholder}
      </option>
      {selectOptions}
    </SelectInput>
  );
};

interface FormTextAreaProps {
  onChange: Function;
  onBlur: Function;
  value: string;
  displayCharCount?: boolean;
  maxCharCount?: number;
  name: string;
  hasError?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  onChange,
  onBlur,
  value,
  displayCharCount,
  maxCharCount,
  name,
  hasError,
}) => {
  const charLength = value.length;

  const checkLength = (e: any) => {
    return e.target.value.length < 135
      ? e.target.value
      : e.target.value.slice(0, 135);
  };

  return (
    <TextAreaWrapper>
      <TextArea
        onChange={(e) => onChange(e, checkLength(e))}
        value={value}
        name={name}
        onBlur={(e) => onBlur(e)}
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

export {
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelectInput,
  FormHint,
  LinkWrapper,
  ButtonWrapper,
};

import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';

import { red, redLight, white, black, greyLighter } from '@styles/constants';

interface FormInputProps {
  hasError?: boolean;
}

const FormLabel = styled.label`
  font-weight: 800;
  padding: 0.825em 0;
`;

const FormInput = styled.input<FormInputProps>`
  max-width: 400px;
  padding: 0.425em;
  border-radius: 0;
  box-shadow: none;
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

const SelectInput = styled.select<FormSelectInputProps>`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px ${greyLighter};
  appearance: none;
  border: ${(props) =>
    props.hasError ? `1px solid ${red}` : `1px solid ${greyLighter};`};
  background: ${(props) => (props.hasError ? redLight : white)};

  :focus {
    border-color: ${black};
  }
`;

const FormHint = styled.small`
  color: ${({ theme }) => theme.colors.greyDark};
`;

const FormTextAreaHint = styled.small`
  color: ${greyLighter};
  position: absolute;
  right: 0;
  bottom: -20px;
`;

const TextAreaWrapper = styled.div`
  position: relative;
`;

export const TextArea = styled.textarea<FormTextAreaProps>`
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

const FormSelectInput: FC<FormSelectInputProps> = ({
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
      onChange={(e) => onChange(e)}
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
  placeholder?: string;
  displayCharCount?: boolean;
  maxCharCount?: number;
  name: string;
  hasError?: boolean;
}

const FormTextArea: FC<FormTextAreaProps> = ({
  onChange,
  onBlur,
  value,
  placeholder,
  displayCharCount,
  maxCharCount,
  name,
  hasError,
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

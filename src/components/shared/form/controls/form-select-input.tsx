import React from 'react';
import styled from 'styled-components';
import { greyLighter, red, redLight, white, black } from '@styles/constants';

interface FormSelectInputProps {
  options: { id: string; type: string }[];
  name?: string;
  onChange: Function;
  onBlur: Function;
  hasError?: boolean;
  placeholder: string;
}

export const SelectInput = styled.select<FormSelectInputProps>`
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

interface FormSelectInputProps {
  options: { id: string; type: string }[];
  name?: string;
  onChange: Function;
  onBlur: Function;
  hasError?: boolean;
  placeholder: string;
}

export const FormSelectInput: React.FC<FormSelectInputProps> = ({
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

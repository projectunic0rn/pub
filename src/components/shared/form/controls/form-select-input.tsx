import React, { FC } from 'react';
import styled from 'styled-components';

import { FormInputWrapper } from './form-input-wrapper';
import { greyLighter, red, redLight, white, black } from '@styles/constants';

type FormSelectInputOption = {
  id: string;
  type: string;
};

type FormSelectInputProps = {
  options: FormSelectInputOption[];
  name: string;
  id?: string;
  onChange: Function;
  onBlur: Function;
  hasError?: boolean;
  label?: string;
  hint?: string;
};

export const SelectInput = styled.select<FormSelectInputProps>`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px ${greyLighter};
  appearance: none;
  border: ${(props) =>
    props.hasError ? `1px solid ${red}` : `1px solid ${greyLighter};`};
  background: ${(props) => (props.hasError ? redLight : white)};
  outline: none;

  :focus {
    border-color: ${black};
  }
`;

export const FormSelectInput: FC<FormSelectInputProps> = ({
  options,
  name,
  onChange,
  onBlur,
  hasError,
  label,
  hint,
  id,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.type} value={option.type}>
      {option.type}
    </option>
  ));

  return (
    <FormInputWrapper name={name} label={label} hint={hint}>
      <SelectInput
        onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
          onBlur(e);
        }}
        options={options}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
        hasError={hasError}
        id={id || name}
      >
        {selectOptions}
      </SelectInput>
    </FormInputWrapper>
  );
};

import React, { FC } from 'react';
import styled from 'styled-components';
import { Field } from 'formik';

import { FormInputWrapper } from './form-input-wrapper';
import { greyLighter, red, redLight } from '@styles/constants';

const StyledFormInput = styled(Field)<FormInputProps>`
  max-width: 400px;
  padding: 0.425em;
  border-radius: 0;
  box-shadow: none;
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

interface FormInputProps {
  type?: string;
  label?: string;
  hint?: string;
  name: string;
  onChange?: Function;
  onBlur?: Function;
  hasError?: boolean;
  placeholder?: string;
  id?: string;
}

export const FormInput: FC<FormInputProps> = ({
  type = 'text',
  label,
  hint,
  id,
  ...props
}) => (
  <FormInputWrapper hint={hint} label={label} {...props}>
    <StyledFormInput type={type} id={id || props.name} {...props} />
  </FormInputWrapper>
);

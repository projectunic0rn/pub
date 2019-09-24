import React from 'react';
import {
  FormLabel,
  FormInput,
  FormHint,
  FormTextArea,
  FormSelectInput,
  ButtonWrapper,
} from './controls';
import styled from 'styled-components';

const Heading = styled.h2``;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

interface FormProps {
  heading?: string;
  handleSubmit?: any;
}

export const Form: React.FC<FormProps> = ({
  heading,
  handleSubmit,
  children,
}) => {
  return (
    <FormElement
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

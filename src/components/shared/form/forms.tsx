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
}
export const Form: React.FC<FormProps> = ({ heading, children }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <FormElement onSubmit={handleSubmit}>
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

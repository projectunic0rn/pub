import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';

const Heading = styled.h2``;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

type FormProps = {
  heading?: string;
  handleSubmit?: Function;
};

export const Form: FC<FormProps> = ({ handleSubmit, heading, children }) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit && handleSubmit(e);
  };

  return (
    <FormElement
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleFormSubmit(e)}
    >
      {heading && <Heading>{heading}</Heading>}
      {children}
    </FormElement>
  );
};

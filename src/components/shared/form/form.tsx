import React, { FC, FormEvent } from 'react';
import styled from 'styled-components';

const Heading = styled.h2``;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

interface Props {
  heading?: string;
  handleSubmit?: Function;
}

export const Form: FC<Props> = ({ handleSubmit, heading, children }) => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit && handleSubmit(e);
  };

  return (
    <FormElement
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleFormSubmit(e)}
    >
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

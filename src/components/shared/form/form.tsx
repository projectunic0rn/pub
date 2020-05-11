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
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export const Form: FC<FormProps> = ({ onSubmit, heading, children }) => {
  return (
    <FormElement onSubmit={onSubmit}>
      {heading && <Heading>{heading}</Heading>}
      {children}
    </FormElement>
  );
};

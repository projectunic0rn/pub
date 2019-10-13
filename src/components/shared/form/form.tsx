import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2``;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

interface Props {
  heading: string;
  handleSubmit: Function;
}

export const Form: React.FC<Props> = ({ handleSubmit, heading, children }) => {
  return (
    <FormElement
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

import React from 'react';
import styled from 'styled-components';

const Heading = styled.h2``;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-weight: 800;
  padding: 0.825em 0;
`;

const FormInput = styled.input`
  max-width: 400px;
  padding: 0.425em;
  border-radius: 0;
  box-shadow: none;
  border: 1px solid gray;

  :focus {
    border-color: black;
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
`;

interface Props {
  heading: string;
}

const Form: React.FC<Props> = ({ heading, children }) => {
  return (
    <FormElement>
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

export { FormLabel, FormInput, LinkWrapper, ButtonWrapper };
export default Form;

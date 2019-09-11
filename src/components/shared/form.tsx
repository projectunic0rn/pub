import React from 'react';
import styled from '@styled-components';

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
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: 1px solid lightgray;

  :focus {
    border-color: black;
  }
`;

const FormHint = styled.small`
  color: gray;
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

interface FormProps {
  heading?: string;
}

const Form: React.FC<FormProps> = ({ heading, children }) => {
  return (
    <FormElement>
      <Heading>{heading}</Heading>
      {children}
    </FormElement>
  );
};

interface FormSelectInputProps {
  options: string[];
  name?: string;
  onChange?: Function;
}

const FormSelectInput: React.FC<FormSelectInputProps> = ({
  options,
  name,
  onChange,
}) => {
  const selectOptions = options.map((option: string) => (
    <option key={option}>{option}</option>
  ));

  const SelectInput = styled.select`
    max-width: 400px;
    padding: 0.425em;
    border-radius: 3px;
    box-shadow: 0 0 1px gray;
    border: 1px solid lightgray;
    appearance: none;

    :focus {
      border-color: black;
    }

    background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
      no-repeat right white;
    background-position-x: 360px;
  `;

  return (
    <SelectInput
      name={name}
      onChange={onChange !== undefined ? (e) => onChange(e) : () => {}}
    >
      {selectOptions}
    </SelectInput>
  );
};

interface FormTextAreaProps {
  onChange: Function;
  value: string;
  displayCharCount: boolean;
  maxCharCount: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  onChange,
  value,
  displayCharCount,
  maxCharCount,
}) => {
  const TextArea = styled.textarea`
    width: 400px;
    padding: 0.425em;
    border-radius: 3px;
    box-shadow: 0 0 1px gray;
    border: 1px solid lightgray;

    :focus {
      border-color: black;
    }
  `;

  const FormTextAreaHint = styled.small`
    color: black;
    position: relative;
    left: -55px;
    bottom: 5px;
  `;

  return (
    <div>
      <TextArea
        onChange={onChange !== undefined ? (e) => onChange(e) : () => {}}
        value={value}
      />
      {displayCharCount && (
        <FormTextAreaHint>
          {value.length}/{maxCharCount}
        </FormTextAreaHint>
      )}
    </div>
  );
};

export {
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelectInput,
  FormHint,
  LinkWrapper,
  ButtonWrapper,
};
export default Form;

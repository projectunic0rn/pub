import React, { useState } from 'react';
import styled from '@styled-components';

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
const SelectInput = styled.select`
  max-width: 400px;
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: 1px solid lightgray;
  appearance: none;
  ​ :focus {
    border-color: black;
  }
  ​background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right white;
  background-position-x: 360px;
`;
const FormHint = styled.small`
  color: gray;
`;
const FormTextAreaHint = styled.small`
  color: black;
  position: relative;
  left: -55px;
  bottom: 5px;
`;
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
const LinkWrapper = styled.div`
  margin: 0.625em 0.125em;
  display: flex;
  flex-direction: column;
  max-width: fit-content;
`;
const ButtonWrapper = styled.div`
  padding: 1.825em 0.125em;
`;

interface FormSelectInputProps {
  options: string[];
  name?: string;
  onChange: Function;
}
const FormSelectInput: React.FC<FormSelectInputProps> = ({
  options,
  name,
  onChange,
}) => {
  const selectOptions = options.map((option: string) => (
    <option key={option}>{option}</option>
  ));

  return (
    <SelectInput
      name={name}
      onChange={(e: any) => onChange(e)}
      key={Math.random()}
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
  key: number;
}
const FormTextArea: React.FC<FormTextAreaProps> = ({
  onChange,
  value,
  displayCharCount,
  maxCharCount,
  key,
}) => {
  return (
    <div>
      <TextArea
        onChange={(e) => onChange(e)}
        value={value}
        name={name}
        key={key}
      />
      {displayCharCount && (
        <FormTextAreaHint key={Math.random()}>
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

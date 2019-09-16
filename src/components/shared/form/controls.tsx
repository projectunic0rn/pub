import React, { useState } from 'react';
import styled from '@styled-components';

const FormLabel = styled.label`
  font-weight: 800;
  padding: 0.825em 0;
`;
const FormInput = styled.input`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: 1px solid lightgray;
  :focus {
    border-color: black;
  }
`;
const SelectInput = styled.select`
  padding: 0.425em;
  border-radius: 3px;
  box-shadow: 0 0 1px gray;
  border: 1px solid lightgray;
  appearance: none;
  ​ :focus {
    border-color: black;
  }
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat 95% 50% white;
`;
const FormHint = styled.small`
  color: gray;
`;
const FormTextAreaHint = styled.small`
  color: black;
  position: absolute;
  right: 0;
  bottom: -20px;
`;
const TextAreaWrapper = styled.div`
  position: relative;
`;
const TextArea = styled.textarea`
  width: 100%;
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

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    text-align: center;
  }
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
    <SelectInput name={name} onChange={(e: any) => onChange(e)}>
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
  const charLength = value.length;

  return (
    <TextAreaWrapper>
      <TextArea
        onChange={(e) => onChange(e, charLength)}
        value={value}
        name={name}
      />
      {displayCharCount && (
        <FormTextAreaHint>
          {value.length}/{maxCharCount}
        </FormTextAreaHint>
      )}
    </TextAreaWrapper>
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

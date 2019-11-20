import React from 'react';
import { TextArea } from './controls';
import styled from 'styled-components';
import { CancelButton } from '../buttons';
import { ApiButton } from '../buttons';

interface OwnProps {
  handleSendClick: Function;
  handleCancelClick: Function;
  handleChange: Function;
  value: string;
}

const Feedback = styled.div`
  width: 400px;
  height: 200px;
  background: white;
  color: gray;
  border: 1px solid gray;
  box-shadow: 0 0 10px #eee;
  padding: 5px;
  border-radius: 10px;
  position: absolute;
  right: 75px;
  z-index: 999;
`;

const ButtonArea = styled.div`
  padding: 5px;
`;

const FeedbackFormTextArea = styled(TextArea)`
  height: 130px;
  border: none;
  outline: none;
  box-shadow: none;
  resize: none;
`;

export const FeedbackForm: React.FC<OwnProps> = ({
  handleSendClick,
  handleCancelClick,
  handleChange,
  value,
}) => {
  return (
    <Feedback>
      <FeedbackFormTextArea
        onChange={(e: React.ChangeEvent) => handleChange(e)}
        onBlur={() => {}}
        value={value}
        name="feedback"
        placeholder="Feedback about this page?"
      />

      <ButtonArea>
        <ApiButton handleClick={handleSendClick} statusText="Sending...">
          Send
        </ApiButton>
        <CancelButton onClick={handleCancelClick} />
      </ButtonArea>
    </Feedback>
  );
};

export default Feedback;

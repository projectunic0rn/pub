import React from 'react';
import { TextArea } from './controls';
import styled from 'styled-components';
import { ApiButton } from '../buttons';
import { SecondaryButton } from '../buttons/secondary-button';

interface OwnProps {
  handleSendClick: Function;
  handleCancelClick: Function;
  handleChange: Function;
  value: string;
}

const Feedback = styled.div`
  max-width: 400px;
  max-height: 200px;
  background: white;
  position: fixed !important;
  color: gray;
  box-shadow: 0 0 10px #eee;
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 10px;
  position: absolute;
  right: 75px;
  z-index: 2;
  flex-direction: row;
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
  color: #aaa;
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
        <SecondaryButton
          style={{ float: 'right' }}
          onClick={(e: React.SyntheticEvent) => handleCancelClick(e)}
        >
          Cancel
        </SecondaryButton>
      </ButtonArea>
    </Feedback>
  );
};

export default Feedback;

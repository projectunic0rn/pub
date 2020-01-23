import React, { ChangeEvent, FC, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { TextArea } from './controls';
import { ApiButton } from '../buttons';
import { SecondaryButton } from '../buttons/secondary-button';
import { noop } from '@utils';

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
  position: absolute;
  color: gray;
  box-shadow: 0 0 10px #eee;
  border: 1px solid lightgray;
  padding: 5px;
  border-radius: 10px;
  right: 75px;
  z-index: 2;
  flex-direction: row;

  @media screen and (max-width: 520px) {
    width: 300px;
    right: 8vw;
  }
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

export const FeedbackForm: FC<OwnProps> = ({
  handleSendClick,
  handleCancelClick,
  handleChange,
  value,
}) => {
  return (
    <Feedback>
      <FeedbackFormTextArea
        onChange={(e: ChangeEvent) => handleChange(e)}
        onBlur={noop}
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
          onClick={(e: SyntheticEvent) => handleCancelClick(e)}
        >
          Cancel
        </SecondaryButton>
      </ButtonArea>
    </Feedback>
  );
};

export default Feedback;

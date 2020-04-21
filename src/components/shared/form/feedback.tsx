import React, { FC, SyntheticEvent, useState, Fragment } from 'react';
import styled from 'styled-components';

import { TextArea } from './controls2';
import { ApiButton } from '../buttons';
import { SecondaryButton } from '../buttons/secondary-button';
import { noop, getNavigatorInfo } from '@utils';
import { Ribbon, CloseButton, Wrapper } from '@components/shared';
import { ApiResponse, ErrorResponse, Feedback, ServiceResolver } from '@api';
import { UserAuthHelper } from '@helpers';
import { useSiteMetadata } from '@hooks';

const FeedbackContainer = styled.div`
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

const FeedbackButtonWrapper = styled(Wrapper)`
  display: flex;
  justify-content: flex-end;
  min-height: inherit;
  padding-bottom: 0;
  margin-top: 1em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding-bottom: 0;
    padding-top: 0;
  }
`;

const FeedbackButton = styled(SecondaryButton)`
  margin-right: ${({ disabled }) => (disabled ? '1em' : 0)};
  box-shadow: 1px 1px 2px ${({ theme }) => theme.colors.shadow};
`;

export const FeedbackForm: FC = () => {
  const siteMetadata = useSiteMetadata();
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>('');

  const buildFeedbackInfo = () => {
    let additionalFeedbackInfo = 'Additional info:\n';

    // Add Browser Info
    const navigatorInfo = getNavigatorInfo();
    for (const [key, value] of Object.entries(navigatorInfo)) {
      additionalFeedbackInfo += `${key}: ${value}\n`;
    }

    // Add App Version
    additionalFeedbackInfo = additionalFeedbackInfo += `app version: v${siteMetadata.version}\n`;

    // Add user info if available
    const username = UserAuthHelper.isUserAuthenticated()
      ? UserAuthHelper.getUserId()
      : 'anonymous user';
    additionalFeedbackInfo += `userId: ${username}\n`;

    return additionalFeedbackInfo;
  };

  const handleSendClick = async () => {
    setError(null);

    const api = ServiceResolver.apiResolver();
    const feedbackInfo = `${feedback}\n\n\n\n${buildFeedbackInfo()}`;
    try {
      const response = (await api.sendFeedback({
        content: feedbackInfo,
      })) as ApiResponse<Feedback | ErrorResponse>;

      if (response.ok) {
        setSuccess('Feedback sent successfully');
        setFeedback('');
      } else {
        setError('Failed to send feedback');
      }
    } catch (err) {
      setError('Failed to send feedback');
    }
  };

  const handleCancelClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setShowFeedbackForm(false);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).className.includes('feedback')) {
      setShowFeedbackForm(false);
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFeedback(e.target.value);

  const handleFeedbackButtonOnClick = () => {
    setShowFeedbackForm(true);
    document.addEventListener('click', handleDocumentClick);
  };

  return (
    <Fragment>
      <FeedbackButtonWrapper>
        {showFeedbackForm && (
          <FeedbackContainer>
            <FeedbackFormTextArea
              onChange={handleChange}
              onBlur={noop}
              value={feedback}
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
          </FeedbackContainer>
        )}

        <FeedbackButton
          disabled={showFeedbackForm}
          onClick={handleFeedbackButtonOnClick}
        >
          💡 Got feedback?
        </FeedbackButton>
      </FeedbackButtonWrapper>
      {success && (
        <Ribbon type="success">
          {success}{' '}
          <CloseButton onClick={() => setSuccess(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}

      {error && (
        <Ribbon type="danger">
          {error}{' '}
          <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}
    </Fragment>
  );
};

export default Feedback;

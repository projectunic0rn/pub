import React, {
  ChangeEvent,
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import Panel from './panel';
import {
  ApiResponse,
  ErrorResponse,
  Feedback,
  Project,
  ServiceResolver,
} from '@api';
import { SecondaryButton } from '@components/shared/buttons';
import { FeedbackForm } from '@components/shared/form';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { Loader, Wrapper } from '@components/shared';

const FeedbackWrapper = styled(Wrapper)`
  display: flex;
  justify-content: flex-end;
  min-height: inherit;
  padding-bottom: 0;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding-bottom: 0;
    padding-top: 0;
  }
`;

const FeedbackButton = styled(SecondaryButton)`
  margin: 0 1rem;
`;

const ProjectGallery: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [success, setSuccess] = useState<string | null>('');
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);

  const handleSendClick = async () => {
    setError(null);

    const api = ServiceResolver.apiResolver();

    try {
      const response = (await api.sendFeedback({
        content: feedback,
      })) as ApiResponse<Feedback | ErrorResponse>;

      if (response.ok) {
        setShowFeedbackForm(false);
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

  useEffect(() => {
    const api = ServiceResolver.apiResolver();

    async function fetchContent() {
      try {
        const response = (await api.getProjects()) as ApiResponse<
          Project[] | ErrorResponse
        >;
        if (response.ok) {
          const projects = response.data as Project[];
          const projectsLookingForMembers = projects.filter(
            (project) => project.lookingForMembers == true,
          );
          setProjects(projectsLookingForMembers);
        } else setError((response.data as ErrorResponse).message);
      } catch (err) {
        setError('Failed to retrieve a list of projects');
      }

      setIsLoading(false);
    }

    fetchContent();
  }, []);

  const handleDocumentClick = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).className.includes('feedback')) {
      setShowFeedbackForm(false);
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeedback(e.target.value);

  const handleFeedbackButtonOnClick = () => {
    setShowFeedbackForm(true);
    document.addEventListener('click', handleDocumentClick);
  };

  return (
    <Fragment>
      <FeedbackWrapper>
        {showFeedbackForm && (
          <FeedbackForm
            handleSendClick={handleSendClick}
            handleCancelClick={handleCancelClick}
            handleChange={handleFormChange}
            value={feedback}
          />
        )}

        <FeedbackButton
          disabled={showFeedbackForm}
          onClick={handleFeedbackButtonOnClick}
        >
          💡 Got feedback?
        </FeedbackButton>
      </FeedbackWrapper>

      <Wrapper>
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

        {isLoading ? (
          <Loader />
        ) : (
          <Panel content={projects} setError={setError} />
        )}
      </Wrapper>
    </Fragment>
  );
};

export default ProjectGallery;

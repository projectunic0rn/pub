import React, { Fragment } from 'react';
import styled from 'styled-components';

import Panel from './panel';
import { Project } from '@/api/types/project';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import ServiceResolver from '@/api/service-resolver';
import { Loader, Wrapper } from '@components/shared';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { FeedbackForm } from '@components/shared/form';
import { Feedback } from '@/api/types/feedback';
import { SecondaryButton } from '@components/shared/buttons';

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

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [success, setSuccess] = React.useState<string | null>('');
  const [feedback, setFeedback] = React.useState<string>('');
  const [showFeedbackForm, setShowFeedbackForm] = React.useState<boolean>(
    false,
  );

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

  const handleCancelClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowFeedbackForm(false);
  };

  React.useEffect(() => {
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>
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

import * as React from 'react';

import Panel from './panel';
import styled from 'styled-components';
import { Project } from '@/api/types/project';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import ServiceResolver from '@/api/service-resolver';
import { Loader } from '../shared';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { FeedbackForm } from '@components/shared/form';
import { Feedback } from '@/api/types/feedback';
import { FeedbackButton } from '@components/shared/buttons';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;
  min-height: 50vh;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
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
      const response = (await api.sendFeedback({ feedback })) as ApiResponse<
        Feedback | ErrorResponse
      >;

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

  const handleDocumentClick = (e: any) => {
    if (!e.target.className.includes('feedback')) setShowFeedbackForm(false);
  };

  return (
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

      {showFeedbackForm ? (
        <FeedbackForm
          handleSendClick={handleSendClick}
          handleCancelClick={handleCancelClick}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFeedback(e.target.value)
          }
          value={feedback}
        />
      ) : (
        <FeedbackButton
          onClick={() => {
            setShowFeedbackForm(true);
            document.addEventListener('click', (e) => handleDocumentClick(e));
          }}
        >
          💡 Got feedback?
        </FeedbackButton>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <Panel content={projects} setError={setError} />
      )}
    </Wrapper>
  );
};

export default ProjectGallery;

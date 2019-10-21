import * as React from 'react';

import Panel from './panel';
import styled from 'styled-components';
import { Project } from '@/api/types/project';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import ServiceResolver from '@/api/service-resolver';
import { Loader } from '../shared';
import { ApiService } from '@/api/api-service';
import { MockApiService } from '@/mocks/mock-api-service';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;
  min-height: 50vh;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Message = styled.div`
  background: ${({ theme }) => theme.colors.alert.danger};
  color: white;
  width: 100%;
  height: 35px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px;
  text-align: center;
  font-size: 16px;
`;

const MessageCloseButton = styled.span`
  position: absolute;
  color: ${({ theme }) => theme.colors.baseinvert};
  right: 15px;

  :hover {
    cursor: pointer;
  }
`;

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [api, setApi] = React.useState<ApiService | MockApiService>(
    new MockApiService(),
  );

  const setMessage = (message: string | null) => {
    setIsError(message !== null && message !== '');
    setError(message);
  };

  React.useEffect(() => {
    setApi(new ServiceResolver().ApiResolver());

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
        } else setMessage((response.data as ErrorResponse).message);
      } catch (err) {
        setMessage('Failed to retrieve a list of projects');
      }

      setIsLoading(false);
    }

    fetchContent();
  }, []);

  return (
    <Wrapper>
      {isError && (
        <Message>
          {error}
          <MessageCloseButton onClick={() => setMessage(null)}>
            &#10006;
          </MessageCloseButton>
        </Message>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Panel content={projects} setMessage={setMessage} api={api} />
      )}
    </Wrapper>
  );
};

export default ProjectGallery;

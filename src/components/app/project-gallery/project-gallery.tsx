import * as React from 'react';

import Panel from './panel';
import styled from '@styled-components';
import { Project } from '@/api/types/project';
import { ApiResponse } from '@/api/types/api-response';
import ServiceResolver from '@/api/service-resolver';

const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Loader = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Message = styled.div`
  background: #de1f1f;
  color: white;
  width: 100%;
  height: 35px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  text-align: center;
  font-size: 16px;
`;

const MessageCloseButton = styled.span`
  position: absolute;
  color: white;
  right: 15px;

  :hover {
    cursor: pointer;
  }
`;

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const setMessage = (message: string) => {
    setIsError(message !== null && message !== '');
    setError(message);
  };

  React.useEffect(() => {
    async function fetchContent() {
      const api = new ServiceResolver().ApiResolver();

      try {
        const response = (await api.getProjects()) as ApiResponse<
          Project[] | string
        >;

        if (response.ok) setProjects(response.data as Project[]);
        else setError(response.data as string);

        setIsError(!response.ok);
      } catch (err) {
        setIsError(true);
        setError(err);
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
          <MessageCloseButton onClick={() => setMessage('')}>
            &#10006;
          </MessageCloseButton>
        </Message>
      )}
      {isLoading && <Loader>Loading...</Loader>}
      <Panel content={projects} setMessage={setMessage} />
    </Wrapper>
  );
};

export default ProjectGallery;

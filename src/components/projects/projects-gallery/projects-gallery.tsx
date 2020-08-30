import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useState, useEffect, useContext } from 'react';

import Panel from './panel';
import { ApiResponse, ErrorResponse, Project, ServiceResolver } from '@api';
import { FeedbackForm } from '@components/shared/form';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { Loader, Seo, Wrapper } from '@components/shared';
import { WorkspaceTypesContext } from '@contexts';

type OwnProps = {};
type ProjectsGalleryProps = OwnProps & RouteComponentProps;

export const ProjectsGallery: FC<ProjectsGalleryProps> = () => {
  const workspaceTypesContext = useContext(WorkspaceTypesContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [success, setSuccess] = useState<string | null>('');

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    async function fetchProjects() {
      try {
        const response = (await api.getProjects()) as ApiResponse<
          Project[] | ErrorResponse
        >;
        // TODO: simplify, reponse.ok will always be true inside try
        if (response.ok) {
          const projects = response.data as Project[];
          setProjects(projects);
        } else {
          // TODO: remove, currently this will never execute.
          setError((response.data as ErrorResponse).message);
        }
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <Fragment>
      <Seo title="Projects" />

      <FeedbackForm page="projects gallery" />

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
          <Panel
            content={projects}
            workspaceLogos={workspaceTypesContext.workspaceLogos}
            setError={setError}
          />
        )}
      </Wrapper>
    </Fragment>
  );
};

import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useState, useEffect } from 'react';

import Panel from './panel';
import { ApiResponse, ErrorResponse, Project, ServiceResolver } from '@api';
import { FeedbackForm } from '@components/shared/form';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { Loader, Seo, Wrapper } from '@components/shared';
import { ProfilingUtils } from '@utils';

type OwnProps = {};
type ProjectGalleryProps = OwnProps & RouteComponentProps;

const ProjectGallery: FC<ProjectGalleryProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [success, setSuccess] = useState<string | null>('');

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    const profiler = new ProfilingUtils(
      'pub-ui-projects-response-time',
      'measure the response time of /projects from client-side.',
    );
    profiler.startTimeRecord();

    async function fetchContent() {
      try {
        const response = (await api.getProjects()) as ApiResponse<
          Project[] | ErrorResponse
        >;
        // TODO: simplify, reponse.ok will always be true inside try
        if (response.ok) {
          const projects = response.data as Project[];
          setProjects(projects);
          profiler.endTimeRecord();
        } else {
          // TODO: remove, currently this will never execute.
          setError((response.data as ErrorResponse).message);
        }
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    }

    fetchContent();
  }, []);

  return (
    <Fragment>
      <Seo title="Projects" />

      <FeedbackForm />

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

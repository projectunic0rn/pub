import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useState, useEffect } from 'react';

import Panel from './panel';
import { ApiResponse, ErrorResponse, Project, ServiceResolver } from '@api';
import { FeedbackForm } from '@components/shared/form';
import { CloseButton, Ribbon } from '@components/shared/ribbons';
import { Loader, Wrapper } from '@components/shared';
import ProjectFilter from './projects-filter';
import ProjectCount from './projects-count';
import styled from 'styled-components';

const NoResults = styled.p`
  font-weight: bold;
  text-align: center;
`;

type OwnProps = {};
type ProjectGalleryProps = OwnProps & RouteComponentProps;

const ProjectGallery: FC<ProjectGalleryProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [success, setSuccess] = useState<string | null>('');

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
          setAllProjects(projectsLookingForMembers);
        } else setError((response.data as ErrorResponse).message);
      } catch (err) {
        setError('Failed to retrieve a list of projects');
      }

      setIsLoading(false);
    }

    fetchContent();
  }, []);

  const filterProjects = (lang: string[]) => {
    if (!lang.length) {
      setProjects(allProjects);
      return;
    }

    const filterProjects = allProjects.filter((project) => {
      const p = project.projectTechnologies.filter(
        (technology) => lang.indexOf(technology.name) > -1,
      );
      return p.length >= 1;
    });

    setProjects(filterProjects);
  };

  return (
    <Fragment>
      <FeedbackForm />
      <Wrapper>
        {success && (
          <Ribbon type="success">
            {success}{' '}
            <CloseButton onClick={() => setSuccess(null)}>&#10006;</CloseButton>
          </Ribbon>
        )}
        <ProjectFilter filter={filterProjects} />
        <ProjectCount count={projects.length} />
        {error && (
          <Ribbon type="danger">
            {error}{' '}
            <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
          </Ribbon>
        )}

        {isLoading ? (
          <Loader />
        ) : projects.length ? (
          <Panel content={projects} setError={setError} />
        ) : (
          <NoResults>No Projects Found.</NoResults>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default ProjectGallery;

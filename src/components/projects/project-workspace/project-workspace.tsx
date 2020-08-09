import { RouteComponentProps } from '@reach/router';
import React, { FC, Fragment, useEffect, useState } from 'react';

import { Wrapper, Seo, Loader } from '@components/shared';
import { FeedbackForm } from '@components/shared/form';
import { ServiceResolver, Project, ApiResponse, ErrorResponse } from '@api';
import { useSiteMetadata } from '@hooks';

interface ProjectWorkspaceParams {
  projectId?: string;
}

type ProjectWorkspaceProps = ProjectWorkspaceParams & RouteComponentProps;

export const ProjectWorkspace: FC<ProjectWorkspaceProps> = (props) => {
  const siteMetadata = useSiteMetadata();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const api = ServiceResolver.apiResolver();
    async function fetchProject() {
      try {
        if (props.projectId == undefined) {
          return;
        }
        const response = (await api.getProject(props.projectId)) as ApiResponse<
          Project | ErrorResponse
        >;
        const project = response.data as Project;
        setProject(project);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchProject();
  });

  return (
    <Fragment>
      <Seo
        title={`${project == undefined ? 'Project' : project.name} Workspace`}
        description={`Project Workspace for ${siteMetadata.title} website`}
      />

      <FeedbackForm page="project page" />

      <Wrapper>
        {project == undefined ? (
          // waiting for project api response
          <Loader />
        ) : (
          <div>Project workspace pages coming soon.</div>
        )}
      </Wrapper>
    </Fragment>
  );
};

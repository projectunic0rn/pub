import { Router } from '@reach/router';
import React, { FC } from 'react';

import { Layout } from '@components/shared';
import { ProjectsGallery, ProjectWorkspace } from '@components/projects';
import { CreateProjectForm } from '@components/shared/form';

const Projects: FC = () => {
  return (
    <Layout>
      <Router>
        <ProjectWorkspace path="projects/:projectId" />
        <CreateProjectForm path="projects/create" />
        <ProjectsGallery path="projects" />
      </Router>
    </Layout>
  );
};

export default Projects;

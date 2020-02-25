import { Router } from '@reach/router';
import React, { FC } from 'react';

import { Layout } from '@components/shared';
import { ProjectGallery } from '@components/projects';
import { CreateProjectForm } from '@components/shared/form';

const Projects: FC = () => {
  return (
    <Layout>
      <Router>
        <CreateProjectForm path="projects/create" />
        <ProjectGallery path="projects" />
      </Router>
    </Layout>
  );
};

export default Projects;

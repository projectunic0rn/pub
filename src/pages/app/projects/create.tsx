import * as React from 'react';

import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { CreateProjectForm } from '@components/shared/form';

const CreateProjectPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title={`Create a Project`}
        description={`Create a project page for ${siteMetadata.title} website`}
        urlSlug="project/create/"
      />
      <CreateProjectForm />
    </Layout>
  );
};

export default CreateProjectPage;

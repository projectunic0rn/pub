import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { CreateProjectForm } from '@components/shared/form';
import { useSiteMetadata } from '@hooks';

const CreateProjectPage: FC = () => {
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

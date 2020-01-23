import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { ProjectGallery } from '@components/app';

const App: FC = () => {
  return (
    <Layout>
      <Seo title="App" urlSlug="app/projects" />
      <ProjectGallery />
    </Layout>
  );
};

export default App;

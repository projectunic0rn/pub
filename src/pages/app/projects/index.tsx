import * as React from 'react';

import { Layout, Seo } from '@components/shared';
import { ProjectGallery } from '@components/app';

const App: React.FC = () => {
  return (
    <Layout>
      <Seo title="App" urlSlug="app/projects" />
      <ProjectGallery />
    </Layout>
  );
};

export default App;

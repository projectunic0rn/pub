import * as React from 'react';

import { Layout, Seo } from '@components/shared';
import { ProjectGallery } from '@components/app';

const App: React.FC = () => (
  <Layout>
    <Seo title="App" urlSlug="app/" />
    <ProjectGallery />
  </Layout>
);

export default App;

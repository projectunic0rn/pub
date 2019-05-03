import * as React from 'react';

import { Hero, About, Signup } from '@components/index-page';
import { Layout } from '@components/shared';

/** The website's landing page. */
const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <About />
    <Signup />
  </Layout>
);

export default IndexPage;

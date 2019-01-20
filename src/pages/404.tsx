import * as React from 'react';

import Container from '@components/container';
import Layout from '@components/layout';
import Seo from '@components/seo';

const NotFoundPage: React.FunctionComponent = () => (
  <Layout>
    <Seo title="Page Not found" />

    <Container>
      <h1>Page Not Found</h1>

      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
);

export default NotFoundPage;

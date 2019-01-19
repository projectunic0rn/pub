import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

const NotFoundPage: React.FunctionComponent = () => (
  <Layout>
    <Seo title="Page Not found" />

    <h1>Page Not Found</h1>

    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;

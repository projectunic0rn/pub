import React, { FC, useState, useEffect } from 'react';
import { useLocation } from '@reach/router';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';

/* Page supports oauth authorization flow */
const OauthPage: FC = () => {
  const location = useLocation();
  const siteMetadata = useSiteMetadata();
  const [appName, setAppName] = useState('App');

  useEffect(() => {
    const app = new URLSearchParams(location.search).get('app');
    if (app === null) {
      return;
    }
    setAppName(app);
  }, [location.search]);

  return (
    <Layout>
      <Seo
        title={`Oauth`}
        description={`Oauth page for ${siteMetadata.title} website`}
        urlSlug="oauth/"
      />
      <Container>
        <PageTitle>Successfully Authorized {appName}</PageTitle>
        <PageBody>
          <p>
            You successfully authorized {appName}. You can close this window.
          </p>
        </PageBody>
      </Container>
    </Layout>
  );
};

export default OauthPage;

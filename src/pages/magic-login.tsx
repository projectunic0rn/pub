import { Location } from '@reach/router';
import React, { FC, Fragment, useState } from 'react';
import { navigate } from 'gatsby';

import { ApiResponse, ErrorResponse, JwtToken, ServiceResolver } from '@api';
import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { SessionStorageHelper } from '@helpers';

/** Page allows members to login via magic link method */
const MagicLoginPage: FC = () => {
  const [message, setMessage] = useState<string>('Logging in...');
  const siteMetadata = useSiteMetadata();

  const handleLogin = (token: string | null) => {
    // Adding 600ms set timeout to allow user to view messages
    setTimeout(async () => {
      if (token === '' || token === null) {
        setMessage('Login token missing.');
        return;
      }
      const auth = ServiceResolver.authResolver();

      try {
        const response = (await auth.signIn({
          email: 'token',
          password: token,
        })) as ApiResponse<JwtToken | ErrorResponse>;

        if (response.ok) {
          SessionStorageHelper.storeJwt(response.data as JwtToken);
          navigate('/projects/');
        } else {
          setMessage((response.data as ErrorResponse).message);
        }
      } catch (err) {
        // TODO: Log error
        setMessage('Invalid credentials');
      }
    }, 600);
  };

  return (
    <Layout>
      {/* Using location to read token from URL Param
          and log in member.
      */}
      <Location>
        {({ location }) => {
          handleLogin(new URLSearchParams(location.search).get('token'));
          return <Fragment />;
        }}
      </Location>
      <Seo
        title={`${siteMetadata.title} - Contact Us`}
        description={`Contact page for ${siteMetadata.title} website`}
        urlSlug="contact/"
      />
      <Container>
        <PageTitle>{message}</PageTitle>
        <PageBody />
      </Container>
    </Layout>
  );
};
export default MagicLoginPage;

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';
import ServiceResolver from '@/api/service-resolver';
import { Location } from '@reach/router';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { JwtToken } from '@/api/types/jwt-token';
import { SessionStorageHelper } from '@/helpers';

/** Page allows members to login via magic link method */
const MagicLoginPage: React.FC = () => {
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
          navigate('/app/projects/');
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
          return <React.Fragment />;
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

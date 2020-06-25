import { useLocation } from '@reach/router';
import React, { FC, useState, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import { ApiResponse, ErrorResponse, JwtToken } from '@api';
import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { SessionStorageHelper } from '@helpers';
import { AuthContext } from '@contexts';

/** Page allows members to login via magic link method */
const MagicLoginPage: FC = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState('Logging in...');
  const siteMetadata = useSiteMetadata();

  const handleLogin = (token: string | null) => {
    // Adding 600ms set timeout to allow user to view messages
    setTimeout(async () => {
      if (token === '' || token === null) {
        setMessage('Login token missing.');
        return;
      }

      try {
        const response = (await authContext.signIn?.({
          email: 'token',
          password: token,
        })) as ApiResponse<JwtToken | ErrorResponse>;

        SessionStorageHelper.storeJwt(response.data as JwtToken);
        navigate('/projects/');
      } catch (err) {
        setMessage(err.message);
      }
    }, 600);
  };

  useEffect(() => {
    handleLogin(new URLSearchParams(location.search).get('token'));
  });

  return (
    <Layout>
      <Seo
        title={`Magic Login`}
        description={`Magic login page for ${siteMetadata.title} website`}
        urlSlug="magin-login/"
      />
      <Container>
        <PageTitle>{message}</PageTitle>
        <PageBody />
      </Container>
    </Layout>
  );
};
export default MagicLoginPage;

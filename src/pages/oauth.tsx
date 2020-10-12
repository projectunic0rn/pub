import React, { FC, useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import { useSiteMetadata } from '@hooks';

import {
  Container,
  Layout,
  PageTitle,
  PageBody,
  Seo,
} from '@components/shared';
import { getLocalStorage, removeLocalStorage } from '@utils';
import { OauthState } from '@components/projects';
import { WorkspaceAppAuth } from '@api/types';
import { ServiceResolver } from '@api';

/* Page supports oauth authorization flow */
const OauthPage: FC = () => {
  const location = useLocation();
  const siteMetadata = useSiteMetadata();
  const [message, setMessage] = useState('Waiting to be redirected...');

  useEffect(() => {
    async function finishAuth() {
      const searchParams = new URLSearchParams(location.search);
      const stateParam = searchParams.get('state');
      const codeParam = searchParams.get('code');

      if (stateParam === null) {
        setMessage(
          'Invalid state param. This may have happened if you visited this page directly. Try installing the app from the project page.',
        );
        return;
      }

      if (codeParam === null) {
        setMessage(
          'Invalid code param. This may have happened if you visited this page directly. Try installing the app from the project page.',
        );
        return;
      }

      let workspaceId = '';
      const workspace = searchParams.get('guild_id');
      if (workspace !== null) {
        workspaceId = workspace;
      }

      let perms = '';
      const permissions = searchParams.get('permissions');
      if (permissions !== null) {
        perms = permissions;
      }

      const oauthState = getLocalStorage<OauthState>(stateParam);

      if (Object.keys(oauthState).length === 0) {
        setMessage(
          'Invalid stored state. This may have happened if you visited this page directly. Try installing the app from the project page. If the problem persists send us feedback.',
        );
        return;
      }

      const workspaceAppAuth: WorkspaceAppAuth = {
        code: codeParam,
        project: oauthState.projectId,
        workspace: workspaceId,
        permissions: perms,
      };

      try {
        const workspaceService = ServiceResolver.workspaceServiceResolver();
        await workspaceService.finishAuth(
          oauthState.workspaceType,
          workspaceAppAuth,
        );
      } catch (error) {
        setMessage(error.message);
      }

      removeLocalStorage(stateParam);
      navigate(oauthState.redirectUrl);
    }

    finishAuth();
  }, [location.search]);

  return (
    <Layout>
      <Seo
        title={`Oauth`}
        description={`Oauth page for ${siteMetadata.title} website`}
        urlSlug="oauth/"
      />
      <Container>
        <PageTitle>Finishing app install...</PageTitle>
        <PageBody>
          <p>{message}</p>
        </PageBody>
      </Container>
    </Layout>
  );
};

export default OauthPage;

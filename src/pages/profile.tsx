import { Router } from '@reach/router';
import React, { FC } from 'react';

import { Layout, Seo } from '@components/shared';
import { ProfileContainer } from '@components/shared/containers';
import { useSiteMetadata } from '@hooks';

const ProfilePage: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title={`Profile`}
        description={`Profile Page For ${siteMetadata.title}`}
        urlSlug="profile/"
      />
      <Router>
        <ProfileContainer path="profile/:id" />
      </Router>
    </Layout>
  );
};

export default ProfilePage;

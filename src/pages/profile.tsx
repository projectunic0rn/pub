import * as React from 'react';
import { Router } from '@reach/router';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { ProfileContainer } from '@components/shared/containers/profile-container';

const ProfilePage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Seo
        title={`Profile`}
        description={`Profile Page For ${siteMetadata.title}`}
        urlSlug="signin/"
      />
      <Router>
        <ProfileContainer path="profile/:id" />
      </Router>
    </Layout>
  );
};

export default ProfilePage;

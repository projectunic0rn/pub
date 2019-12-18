import * as React from 'react';
import { Router } from '@reach/router';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { ProfileContainer } from '@components/shared/containers/profile-container';
import { UserAuthHelper } from '@/helpers';
import { navigate } from 'gatsby';

const ProfilePage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  React.useEffect(() => {
    if (location.pathname === '/profile/') {
      if (UserAuthHelper.isUserAuthenticated()) {
        const userId = UserAuthHelper.getUserId();
        navigate(`/profile/${userId}`);
      } else {
        navigate('/signin', {
          state: { message: 'You need to be signed in' },
        });
      }
    }
  }, []);

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

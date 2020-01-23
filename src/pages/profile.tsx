import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import React, { FC, useEffect } from 'react';

import { Layout, Seo } from '@components/shared';
import { ProfileContainer } from '@components/shared/containers';
import { UserAuthHelper } from '@helpers';
import { useSiteMetadata } from '@hooks';

const ProfilePage: FC = () => {
  const siteMetadata = useSiteMetadata();

  useEffect(() => {
    if (location.pathname.startsWith('/profile')) {
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
        urlSlug="profile/"
      />
      <Router>
        <ProfileContainer path="profile/:id" />
      </Router>
    </Layout>
  );
};

export default ProfilePage;

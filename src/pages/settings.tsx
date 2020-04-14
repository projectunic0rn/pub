import { navigate } from 'gatsby';
import React, { FC, useEffect } from 'react';

import { Layout, Seo } from '@components/shared';
import { AccountSettings } from '@components/shared/containers';
import { UserAuthHelper } from '@helpers';
import { useSiteMetadata } from '@hooks';

const SettingsPage: FC = () => {
  const siteMetadata = useSiteMetadata();

  useEffect(() => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      navigate('/signin', {
        state: {
          message: 'You need to be signed in to edit your account settings',
        },
      });
    }
  }, []);

  return (
    <Layout>
      <Seo
        title={`Account Settings`}
        description={`Account Settings Page For ${siteMetadata.title}`}
        urlSlug="settings/"
      />
      <AccountSettings />
    </Layout>
  );
};

export default SettingsPage;

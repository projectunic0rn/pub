import * as React from 'react';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { UserAuthHelper } from '@helpers';
import { navigate } from 'gatsby';
import { AccountSettings } from '@components/shared/containers';

const SettingsPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  React.useEffect(() => {
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

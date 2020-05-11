import { navigate } from 'gatsby';
import React, { FC, useEffect, useState } from 'react';

import { Layout, Seo } from '@components/shared';
import { AccountSettings } from '@components/shared/containers';
import { UserAuthHelper } from '@helpers';
import { useSiteMetadata } from '@hooks';
import { ErrorResponse, User, ServiceResolver, ApiResponse } from '@api';

const SettingsPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!UserAuthHelper.isUserAuthenticated()) {
      navigate('/signin', {
        state: {
          message: 'You need to be signed in to edit your account settings',
        },
      });

      return;
    }

    const api = ServiceResolver.apiResolver();

    const fetchContent = async () => {
      try {
        const userId = UserAuthHelper.getUserId();
        const response = (await api.getUser(userId)) as ApiResponse<
          User | ErrorResponse
        >;

        if (response.ok) {
          const user = response.data as User;
          setUser(user);
        }
      } catch {}

      setIsLoading(false);
    };

    fetchContent();
  }, []);

  return (
    <Layout>
      <Seo
        title={`Account Settings`}
        description={`Account Settings Page For ${siteMetadata.title}`}
        urlSlug="settings/"
      />
      <AccountSettings isLoading={isLoading} user={user} />
    </Layout>
  );
};

export default SettingsPage;

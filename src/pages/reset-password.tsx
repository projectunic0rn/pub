import { Location } from '@reach/router';
import React, { FC } from 'react';
import { Layout, Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { ResetPasswordForm } from '@components/shared/form/reset-password';

const ResetPasswordPage: FC = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <Layout>
      <Seo
        title={`${siteMetadata.title} - Reset Password`}
        description={`Reset Password page for ${siteMetadata.title} website`}
        urlSlug="reset-password/"
      />
      {/* Using location to read token from URL Param
          for validating password reset.
      */}
      <Location>
        {({ location }) => {
          return (
            <ResetPasswordForm
              token={new URLSearchParams(location.search).get('token')}
            />
          );
        }}
      </Location>
    </Layout>
  );
};
export default ResetPasswordPage;
